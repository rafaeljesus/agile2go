describe('App.Models.Projects#initialize', function() {

  var model, attributes;

  beforeEach(function() {
    attributes = {
      id: 1,
      name: 'Agile2Go',
      company: 'Crafting',
      user_ids: ['54309a91793f766b0b000019', '54309a91793f766b0b000020']
    };
    model = new App.Models.Project(attributes);
  });

  it('should has many users', function() {
    var users = model.users;
    var typeCheck = users instanceof App.Collections.Users;
    expect(typeCheck).toBeTruthy();
  });

  it('should call toUserIds method when toJSON is called', function() {
    spyOn(model, 'toUserIds');
    model.toJSON();
    expect(model.toUserIds).toHaveBeenCalled();
  });

  it("re-parses the users", function() {
    var expectedId = '54309a91793f766b0b000022'
      , attrs = { user_ids: ['54309a91793f766b0b000020', '54309a91793f766b0b000021'] }
      , project = new App.Models.Project(attrs)
      , newCollection = [{ id: expectedId }];

    project.users.reset(newCollection);
    var user = project.users.findWhere({ id: expectedId });
    expect(user.id).toEqual(expectedId);
  });

  it('should validate when model have required attributes', function(){
    expect(model.isValid()).toBeFalsy();
  });
});
