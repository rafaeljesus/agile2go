describe('App.Views.SprintNew', function(){
  var view
  , model
  , projects
  , $el
  , e
  ;

  beforeEach(function(){
    projects = new App.Collections.Projects([{ id: 1, name: 'projectFake', company: 'companyFake', description: 'descriptionFake' }]);
    view = new App.Views.SprintNew({ projects: projects });
    view.render();
    model = view.model;
    e = new Event(undefined);
  });

  afterEach(function(){
    view.$('#daily').val('');
    view.$('#points').val('');
    view.$('#start-date').val('');
    view.$('#end-date').val('');
    view.$('select')[0].options = [];
  });

  it('should not persists a empty model', function(){
    spyOn(model, 'save');
    spyOn(view, 'formValidationError');
    view.save(e);
    expect(model.save).not.toHaveBeenCalled();
    expect(view.formValidationError).toHaveBeenCalled();
  });

  it('should persists a model', function(){
    spyOn(model, 'save');
    view.$('#daily').val('10:00');
    view.$('#points').val(300);
    view.$('#start-date').val('01/01/2014');
    view.$('#end-date').val('14/01/2014');
    view.$('select')[0].options[0] = new Option(projects.at(0).get('name'), projects.at(0).get('id'));
    view.$('select').val(projects.at(0).get('id')).trigger('change');
    view.save(e);
    expect(model.save).toHaveBeenCalled();
  });
});
