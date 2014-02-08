describe('App.Views.ProjectsIndex', function(){

  var $el
  , view
  , collection;

  beforeEach(function(){
    var attributes = { id: 1, name: 'nameFake', company: 'companyFake', description: 'descriptionFake', assignedUsers: [{ id: 1, name: 'userNameFake' }] };
    collection = new App.Collections.Projects({});
    collection.reset(attributes);
    view = new App.Views.ProjectsIndex({ collection: collection });
    $el = $(view.render().el);
  });

  it('should renders a collections of projects', function(){
    expect($el).toHaveText(/nameFake/);
    expect($el).toHaveText(/companyFake/);
    expect($el).toHaveText(/descriptionFake/);
  });

  it('should call showModal method', function(){
    spyOn(view, 'showModal');
    view.showModal();
    expect(view.showModal).toHaveBeenCalled();
  });
});
