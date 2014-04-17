describe('App.Views.TasksIndex', function(){

  var $el
  , view
  , collection
  , attributes;

  window.fayejsPath = 'http://0.0.0.0:9292';

  beforeEach(function(){
    attributes = { id: 1, title: 'Assigning a Tasks to others', priority: 5, points: 8, status: 'Todo', sprint: { id: 1 } };
    collection = new App.Collections.Tasks({});
    collection.reset(attributes);
    view = new App.Views.TasksIndex({ collection: collection });
    $el = $(view.render().el);
  });

  it('should renders a collections of tasks', function(){
    var items = $el.find('#items');
    expect(items.find('.removable')).toHaveClass('removable');
    expect(items).toHaveText(/Assigning a Tasks to others/);
    expect(items).toHaveText(/Todo/);
  });

  it('should call renderRow method', function(){
    spyOn(view, 'renderItem');
    view.renderItem(collection.first());
    expect(view.renderItem).toHaveBeenCalled();
    expect(view.children._wrapped.length).toEqual(collection.length);
  });

  it('should remove a task from dashboard', function(){
  });
});
