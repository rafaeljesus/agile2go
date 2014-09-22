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
    var html = $el.find('.event');
    expect(html.toHaveText(/nameFake/);
    expect(html).toHaveText(/companyFake/);
    expect(html).toHaveText(/descriptionFake/);
  });

  it('should call renderRow method', function(){
    spyOn(view, 'renderRow');
    view.renderRow(collection.first());
    expect(view.renderRow).toHaveBeenCalled();
    expect(view.children._wrapped.length).toEqual(collection.length);
  });
});
