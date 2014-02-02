describe('App', function(){
  describe('ensure namespaces are declared', function(){
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

    it('has a namespace for Mixins', function(){
      expect(App.Mixins).toBeTruthy();
    });
  });

  describe('when call App.init()', function(){
    it('instantiate a menu view', function(){
      sinon.spy(App.Views, 'Menu');
      App.init({});
      expect(App.Views.Menu).toHaveBeenCalled();
      App.Views.Menu.restore();
    });

    it('instantiate a site router', function(){
      sinon.spy(App.Routers, 'Site');
      App.init({});
      expect(App.Routers.Site).toHaveBeenCalled();
      App.Routers.Site.restore();
    });

    it('instantiate a project router', function(){
      sinon.spy(App.Routers, 'Projects');
      App.init({});
      expect(App.Routers.Projects).toHaveBeenCalled();
      App.Routers.Projects.restore();
    });

  });
});
