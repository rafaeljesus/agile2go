describe('App', function(){
  it('has a namespace for Models', function(){
    expect(App.Models).toBeTruthy();
  });

  it('has a namespace for Collections', function(){
    expect(App.Collections).toBeTruthy();
  });

  it('has a namespace for Views', function(){
    expect(App.Views).toBeTruthy();
  });

  it('has a namespace for Routers', function(){
    expect(App.Routers).toBeTruthy();
  });

  describe('instantiates a Projects router', function(){
    sinon.spy(App.Routers, 'Projects');
    App.init({});
    expect(App.Routers.Projects({})).toHaveBeenCalled();
    App.Routers.Projects({}).restore();
  });
});
