describe('App.Models.Tasks#initialize', function() {

  var model;

  beforeEach(function() {
    var attributes = {
      id: 1,
      title: 'Assigning a Tasks to others',
      priority: 5,
      points: 8,
      status: 'Todo',
      sprint_id: 1,
      user_ids: ['54309a91793f766b0b000019', '54309a91793f766b0b000020']
    };
    model = new App.Models.Task(attributes);
  });

  it('should has one sprint', function() {
    var sprint = model.sprint;
    var typeCheck = sprint instanceof App.Models.Sprint;
    expect(typeCheck).toBeTruthy();
  });

  it('should has many users', function() {
    var users = model.users;
    var typeCheck = users instanceof App.Collections.Users;
    expect(typeCheck).toBeTruthy();
  });

  it('re-parse the sprint', function() {
    var expectedId = '54309a91793f766b0b000021'
      , sprintAttr = { sprint_id: '54309a91793f766b0b000020' }
      , task = new App.Models.Task(sprintAttr);

    task.sprint.set({ id: expectedId });
    expect(task.sprint.get('id')).toEqual(expectedId);
  });

  it("re-parses the users", function() {
    var expectedId = '54309a91793f766b0b000022'
      , attrs = { user_ids: ['54309a91793f766b0b000020', '54309a91793f766b0b000021'] }
      , task = new App.Models.Task(attrs)
      , newCollection = [{ id: expectedId }];

    task.users.reset(newCollection);
    var user = task.users.findWhere({ id: expectedId });
    expect(user.id).toEqual(expectedId);
  });

  it('should call toUserIds method when toJSON is called', function() {
    spyOn(model, 'toUserIds');
    model.toJSON();
    expect(model.toUserIds).toHaveBeenCalled();
  });

  it('should validate when model have required attributes', function() {
    model.attributes.title = undefined;
    expect(model.isValid()).toBeFalsy();
  });

});
