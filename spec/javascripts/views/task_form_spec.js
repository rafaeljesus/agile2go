describe('App.Views.TaskForm', function(){
  var view
  , model
  , sprints
  , $el
  , e
  ;

  beforeEach(function(){
    var sprint = { id: 1, daily: '10:00', points: 40, start_date: '01/01/2014', end_date: '01/15/2014', project: { id: 1, name: 'projectNameFake' } };
    this.server = sinon.fakeServer.create();
    sprints = new App.Collections.Sprints([sprint]);
    view = new App.Views.TaskForm({ sprints: sprints });
    model = view.model;
    view.render();
    e = new Event(undefined);
  });

  afterEach(function(){
    view.$('#status').val('');
    view.$('#priority').val('');
    view.$('#points').val('');
    view.$('#title').val('');
    view.$('#story').val('');
    view.$('select')[0].options = [];
    this.server.restore();
  });

  var commit = function(){
    view.$('#status').val('Todo');
    view.$('#priority').val(5);
    view.$('#points').val(8);
    view.$('#title').val('Create a new Task');
    view.$('#story').val('User Story goes here');
    view.$('select')[0].options[0] = new Option(sprints.at(0).get('name'), sprints.at(0).get('id'));
    view.$('select').val(sprints.at(0).get('id')).trigger('change');
  };


  it('should call onRender when instantiate', function(){
    spyOn(view, 'onRender');
    view.render();
    expect(view.onRender).toHaveBeenCalled();
  });

  it('should not persists a empty model', function(){
    spyOn(model, 'save');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should not persists when title is empty', function(){
    spyOn(model, 'save');
    commit();
    view.$('#title').val('');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should not persists when story is empty', function(){
    spyOn(model, 'save');
    commit();
    view.$('#story').val('');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should commit model', function(){
    commit();
    view.commit();
    expect(model.isValid()).toBeTruthy();
    expect(model.sprint).toEqual(view.model.sprint);
  });

  it('should persists a model', function(){
    spyOn(model, 'save');
    commit();
    view.save(e);
    this.server.respond();
    expect(model.save).toHaveBeenCalled();
  });

});
