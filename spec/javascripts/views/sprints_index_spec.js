describe('App.Views.SprintsIndex', function(){

  var $el
  , view
  , collection;

  beforeEach(function(){
    var attributes = { id: 1, name: 'nameFake', points: '300', daily: '10:00' };
    collection = new App.Collections.Sprints({});
    collection.reset(attributes);
    view = new App.Views.SprintsIndex({ collection: collection });
    $el = $(view.render().el);
  });

  it('should renders a collections of sprints', function(){
    expect($el).toHaveText(/nameFake/);
    expect($el).toHaveText(/300/);
    expect($el).toHaveText(/10:00/);
  });

  it('should call renderRow method', function(){
    spyOn(view, 'renderRow');
    view.renderRow(collection.first());
    expect(view.renderRow).toHaveBeenCalled();
    expect(view.children._wrapped.length).toEqual(collection.length);
  });
});
