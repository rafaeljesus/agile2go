describe('App.Views.ProjectEdit', function(){
  var view
  , model
  , users;

  beforeEach(function(){
    var modelAttrs = { id: 1, name: 'nameFake', company: 'companyFake', description: 'descriptionFake', assignedUsers: [{ id: 1, name: 'userNameFake' }] };
    var usersAttrs = [{ id: 1, name: 'userNameFake', email: 'emailFake'  }];
    model = new App.Models.Project(modelAttrs);
    users = new App.Collections.Users(usersAttrs);
    view = new App.Views.ProjectEdit({ model: model, users: users });
    view.render();
  });

  it('should edit a model', function(){
    spyOn(model, 'update');
    view.update(new Event(undefined));
    expect(model.save).toHaveBeenCalled();
  });

  it('should render assigned users', function(){
    var assignedUsers = view.$('select')[0].options;
    expect(assignedUsers.length).toEqual(1);
  });

  it('should render multiple assigned users', function(){
    var twoMoreUsers = [{ id: 2, name: 'userNamefake2'}, { id: 3, name: 'userNamefake3' }];
    users.add(twoMoreUsers);
    view.render();
    var assignedUsers = view.$('select')[0].options;
    expect(assignedUsers.length).toEqual(3);
  });

});
