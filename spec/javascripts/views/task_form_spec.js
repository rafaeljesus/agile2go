describe('App.Views.TaskForm', function() {

  var view
  , model
  , sprints
  , users
  , $el
  , e;

  beforeEach(function() {
    var sprintJSON = [{
      id: '54309a91793f766b0b000020',
      name: 'sprint1',
      daily: '10:00',
      points: 40,
      start_date: '01/01/2014',
      end_date: '01/15/2014',
      project_id: '54309a91793f766b0b000040'
    }];
    this.server = sinon.fakeServer.create();
    sprints = new App.Collections.Sprints(sprintJSON);
    collection = new App.Collections.Tasks();
    users = new App.Collections.Users();
    view = new App.Views.TaskForm({ sprints: sprints, collection: collection, users: users });
    model = view.model;
    view.render();
    e = document.createEvent('KeyboardEvent');
  });

  afterEach(function() {
    view.$('#status').val('');
    view.$('#priority').val('');
    view.$('#points').val('');
    view.$('#title').val('');
    view.$('#story').val('');
    view.$('select')[0].options = [];
    this.server.restore();
  });

  var commit = function() {
    view.$('#status').val('Todo');
    view.$('#priority').val(5);
    view.$('#points').val(8);
    view.$('#title').val('Create a new Task');
    view.$('#story').val('User Story goes here');
    view.$('select')[0].options[0] = new Option(sprints.at(0).get('name'), sprints.at(0).get('id'));
    view.$('select').val(sprints.at(0).get('id')).trigger('change');
  };

  it('should not persists a empty model', function() {
    spyOn(model, 'save');
    view.save(e);
    expect(model.save).toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should not persists when title is empty', function() {
    spyOn(model, 'save');
    commit();
    view.$('#title').val('');
    view.save(e);
    expect(model.save).toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should not persists when story is empty', function() {
    spyOn(model, 'save');
    commit();
    view.$('#story').val('');
    view.save(e);
    expect(model.save).toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should commit model', function() {
    commit();
    view.commit();
    expect(model.isValid()).toBeTruthy();
    expect(model.sprint).toEqual(view.model.sprint);
  });

  it('should persists a model', function() {
    spyOn(model, 'save');
    commit();
    view.save(e);
    this.server.respond();
    expect(model.save).toHaveBeenCalled();
  });

});
