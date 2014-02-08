describe('App.Views.ProjectsIndex', function(){

  var $el
  , view
  , collection = new App.Collections.Projects({});

  beforeEach(function(){
    var attributes = { id: 1, name: 'nameFake', company: 'companyFake', description: 'descriptionFake', assignedUsers: [{ id: 1, name: 'userNameFake' }] };
    collection.reset(attributes);
    view = new App.Views.ProjectsIndex({ collection: collection });
    $el = $(view.render().el);
  });

  it('should renders a collections of projects', function(){
    expect($el).toHaveText(/nameFake/);
    expect($el).toHaveText(/companyFake/);
    expect($el).toHaveText(/descriptionFake/);
  });

  it('should display confirm modal', function(){
    spyOn(view, 'showModal');
    view.showModal();
    expect(view.showModal).toHaveBeenCalled();
  });
});
