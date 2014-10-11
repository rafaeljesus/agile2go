describe('App.Views.ProjectsIndex', function() {

  var $el
  , view
  , collection;

  beforeEach(function() {
    var attributes = {
      id: '54309a91793f766b0b000020',
      name: 'nameFake',
      description: 'descriptionFake',
      created_at: '2014/01/01',
      user_ids: ['54309a91793f766b0b000019', '54309a91793f766b0b000020']
    };
    collection = new App.Collections.Projects();
    collection.reset(attributes);
    view = new App.Views.ProjectsIndex({ collection: collection });
    $el = $(view.render().el);
  });

  it('should renders a collections of projects', function() {
    var html = $el.find('.event');
    expect(html).toHaveText(/nameFake/);
    expect(html).toHaveText(/descriptionFake/);
    expect(html).toHaveText(/ago/);
  });

  it('should call renderRow method', function() {
    spyOn(view, 'renderRow');
    view.renderRow(collection.first());
    expect(view.renderRow).toHaveBeenCalled();
    expect(view.children._wrapped.length).toEqual(collection.length);
  });
});
