describe('App.Collections.Sprints', function(){
  it('contains a instance of App.Models.Sprint', function(){
    var collection = new App.Collections.Sprints({});
    expect(collection.model).toEqual(App.Models.Sprint);
  });
});
