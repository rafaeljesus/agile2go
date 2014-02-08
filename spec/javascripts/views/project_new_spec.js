describe('App.Views.ProjectNew', function(){
  var view
  , usersCollection
  , model
  , e;

  beforeEach(function(){
    users = [{ id: 1, name: 'userNamefake', email: 'email@fake.com' }];
    usersCollection = new App.Collections.Users(users);
    view = new App.Views.ProjectNew({ users: usersCollection });
    view.render();
    model = view.model;
    e = new Event(undefined);
  });

  it('should not persists a empty model', function(){
    spyOn(model, 'save');
    spyOn(view, 'formValidationError');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(view.formValidationError).toHaveBeenCalled();
  });

});
