describe('App.Views.ProjectsIndex', function(){

  var collection = new App.Collections.Projects({});

  beforeEach(function(){
    var attributes = { id: 1, name: 'nameFake', company: 'companyFake', description: 'descriptionFake', assignedUsers: [{ id: 1, name: 'userNameFake' }] };
    collection.reset(attributes);
  });

  it('should renders a collections of projects', function(){
    var view = new App.Views.ProjectsIndex({ collection: collection });
    var $el = $(view.render().el);
    expect($el).toHaveText(/nameFake/);
    expect($el).toHaveText(/companyFake/);
    expect($el).toHaveText(/descriptionFake/);
  });
});
