describe('App.Views.ProjectNew', function(){
  var view
  , users
  , model
  , $el
  , e;

  beforeEach(function(){
    users = new App.Collections.Users([{ id: 1, name: 'userNamefake', email: 'email@fake.com' }]);
    view = new App.Views.ProjectNew({ users: users });
    view.render();
    model = view.model;
    e = new Event(undefined);
  });

  afterEach(function(){
    view.$('#name').val('');
    view.$('#company').val('');
    view.$('#description').val('');
    view.$('select')[0].options = [];
  });

  it('should not persists a empty model', function(){
    spyOn(model, 'save');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(model.isValid).toBeTruthy();
  });

  it('should persists a new model', function(){
    spyOn(model, 'save');
    view.$('#name').val('nameFake');
    view.$('#company').val('companyFake');
    view.$('#description').val('descriptionFake');
    view.save(e);
    expect(model.save).toHaveBeenCalled();
  });

  it('should commit model', function(){
    view.$('#name').val('nameFake');
    view.$('#company').val('companyFake');
    view.$('#description').val('descriptionFake');
    view.$('select')[0].options[0] = new Option(users.at(0).get('name'), users.at(0).get('id'));
    view.$('select').val(users.at(0).get('id')).trigger('change');
    view.commit();
    expect(model.isValid()).toBeTruthy();
    expect(model.assignedUsers.toJSON()).toEqual(users.toJSON());
  });

  it('should assigne users', function(){
    expect(model.assignedUsers.length).toEqual(0);
    view.$('select')[0].options[0] = new Option(users.at(0).get('name'), users.at(0).get('id'));
    view.$('select').val(users.at(0).get('id')).trigger('change');
    view.commit();
    expect(model.assignedUsers.length).toEqual(1);
  });

});
