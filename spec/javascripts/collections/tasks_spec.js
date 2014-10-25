describe('App.Collections.Tasks', function() {

  it('contains a instance of App.Models.Task', function() {
    var collection = new App.Collections.Tasks();
    expect(collection.model).toEqual(App.Models.Task);
  });

});
