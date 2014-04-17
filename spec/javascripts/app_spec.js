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
    var server;

    beforeEach(function(){
      server = sinon.fakeServer.create();
      server.respondWith('GET', '/current_user/1', [ 200, {"Content-Type": "application/json"}, JSON.stringify({ signed_in: true, id: 1 }) ]);
    });

    afterEach(function(){
      server.restore();
    });

    it('instantiate a menu view', function(){
    });

    it('instantiate a site router', function(){
      spyOn(App.Routers, 'Site');
      App.init({});
      expect(App.Routers.Site).toHaveBeenCalled();
    });

    it('instantiate a user_registration router', function(){
      spyOn(App.Routers, 'UserRegistrations');
      App.init({});
      expect(App.Routers.UserRegistrations).toHaveBeenCalled();
    });

    it('instantiate a user_session router', function(){
      spyOn(App.Routers, 'UserSessions');
      App.init({});
      expect(App.Routers.UserSessions).toHaveBeenCalled();
    });

    it('instantiate a project router', function(){
      spyOn(App.Routers, 'Projects');
      App.init({});
      expect(App.Routers.Projects).toHaveBeenCalled();
    });

    it("starts Backbone.history", function() {
      Backbone.history.started = null;
      Backbone.history.stop();
      spyOn(Backbone.history, 'start');
      App.init({});
      expect(Backbone.history.start).toHaveBeenCalled();
    });

  });
});
