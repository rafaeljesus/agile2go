describe('App.Views.TasksIndex', function(){

  var $el
  , view
  , collection
  , attributes;

  beforeEach(function(){
    attributes = { id: 1, title: 'Assigning a Tasks to others', priority: 5, points: 8, status: 'Todo', sprint: { id: 1 } };
    collection = new App.Collections.Tasks({});
    collection.reset(attributes);
    view = new App.Views.TasksIndex({ collection: collection });
    $el = $(view.render().el);
  });

  it('should renders a collections of tasks', function(){
    expect($el.children().children().children().children()).toHaveClass('removable');
    expect($el).toHaveText(/Assigning a Tasks to others/);
    expect($el).toHaveText(/Todo/);
  });

  it('should call renderRow method', function(){
    spyOn(view, 'renderItem');
    view.renderItem(collection.first());
    expect(view.renderItem).toHaveBeenCalled();
    expect(view.children._wrapped.length).toEqual(collection.length);
  });
});
