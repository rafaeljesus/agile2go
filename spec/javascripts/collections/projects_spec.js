describe('App.Collections.Projects', function(){
  it('contains a instance of App.Models.Project', function(){
    var collection = new App.Collections.Projects({});
    expect(collection.model).toEqual(App.Models.Project);
  });

});
