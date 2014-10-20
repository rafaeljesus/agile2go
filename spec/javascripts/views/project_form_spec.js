describe('App.Views.ProjectForm', function() {

  var view
  , userCollection
  , model
  , $el
  , e;

  beforeEach(function() {
    userCollection = new App.Collections.Users([{ id: '54309a91793f766b0b000019', name: 'userNamefake', email: 'email@fake.com' }]);
    view = new App.Views.ProjectForm({ users: userCollection });
    view.render();
    model = view.model;
    e = document.createEvent('KeyboardEvent');
  });

  afterEach(function() {
    view.$('#name').val('');
    view.$('#company').val('');
    view.$('#description').val('');
    view.$('select')[0].options = [];
  });

  var commit = function() {
    var optionsEl = new Option(userCollection.at(0).get('name'), userCollection.at(0).get('id'));
    view.$('#name').val('nameFake');
    view.$('#company').val('companyFake');
    view.$('#description').val('descriptionFake');
    view.$('select')[0].options[0] = optionsEl;
    view.$('select').val(userCollection.at(0).get('id')).trigger('change');
  };

  it('should call onRender when instantiate', function() {
    spyOn(view, 'onRender');
    view.render();
    expect(view.onRender).toHaveBeenCalled();
  });

  it('should not persists a empty model', function() {
    spyOn(model, 'save');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(model.isValid).toBeTruthy();
  });

  it('should persists a new model', function() {
    spyOn(model, 'save');
    view.$('#name').val('nameFake');
    view.$('#company').val('companyFake');
    view.$('#description').val('descriptionFake');
    view.save(e);
    expect(model.save).toHaveBeenCalled();
  });

  it('should commit model', function() {
    commit();
    view.commit();
    expect(model.isValid()).toBeTruthy();
    expect(model.users).toEqual(userCollection.toArray());
  });

  it('should assigne users', function() {
    expect(model.users.length).toEqual(0);
    view.$('select')[0].options[0] = new Option(userCollection.at(0).get('name'), userCollection.at(0).get('id'));
    view.$('select').val(userCollection.at(0).get('id')).trigger('change');
    view.commit();
    expect(model.users.length).toEqual(1);
  });

  it('should render on assigned user', function() {
    var users = view.$('select')[0].options;
    expect(users.length).toEqual(1);
  });

  it('should render multiple assigned users', function() {
    var twoMoreUsers = [{ id: 2, name: 'userNamefake2'}, { id: 3, name: 'userNamefake3' }];
    userCollection.add(twoMoreUsers);
    view.render();
    var users = view.$('select')[0].options;
    expect(users.length).toEqual(users.length);
  });

  it('should getUsersIds match number of selected users', function() {
    commit();
    expect(view.toUsersIds().length).toEqual(userCollection.length);
  });

});
