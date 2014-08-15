describe('App.Views.SprintForm', function(){
  var view
  , model
  , projects
  , $el
  , e
  ;

  beforeEach(function(){
    projects = new App.Collections.Projects([{ id: 1, name: 'projectFake', company: 'companyFake', description: 'descriptionFake' }]);
    view = new App.Views.SprintForm({ projects: projects });
    view.render();
    model = view.model;
    e = document.createEvent('KeyboardEvent');
  });

  afterEach(function(){
    view.$('#name').val('');
    view.$('#daily').val('');
    view.$('#points').val('');
    view.$('#start-date').val('');
    view.$('#end-date').val('');
    view.$('select')[0].options = [];
  });

  var commit = function(){
    view.$('#name').val('SprintFake');
    view.$('#daily').val('10:00');
    view.$('#points').val(300);
    view.$('#start-date').val('03/01/2014');
    view.$('#end-date').val('03/10/2014');
    view.$('select')[0].options[0] = new Option(projects.at(0).get('name'), projects.at(0).get('id'));
    view.$('select').val(projects.at(0).get('id')).trigger('change');
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

  it('should not persists when daily is invalid', function(){
    spyOn(model, 'save');
    commit();
    view.$('#daily').val('invalid hour');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should not persists when points is not a number', function(){
    spyOn(model, 'save');
    commit();
    view.$('#points').val('invalid points');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should not persists when start_date is invalid', function(){
    spyOn(model, 'save');
    commit();
    view.$('#start-date').val('invalid date');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should not persists when end_date is invalid', function(){
    spyOn(model, 'save');
    commit();
    view.$('#end-date').val('invalid date');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(model.isValid()).toBeFalsy();
  });

  it('should commit model', function(){
    commit();
    view.commit();
    expect(model.isValid()).toBeTruthy();
    expect(model.project).toEqual(view.model.project);
  });

  it('should persists a model', function(){
    spyOn(model, 'save');
    commit();
    view.save(e);
    expect(model.save).toHaveBeenCalled();
  });

});
