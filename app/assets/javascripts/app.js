var App = new (Backbone.View.extend({
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},

  semanticUI: function(){
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $('.ui.popup').popup();
  },

  start: function(){
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  },

  init: function(){
    var current_user = new App.Models.CurrentUser({});
    var injector = { current_user: current_user };
    new App.Views.Menu(injector);
    new App.Routers.Site(injector);
    new App.Routers.UserRegistrations(injector);
    new App.Routers.UserSessions(injector);
    new App.Routers.Projects(injector);
    new App.start();
    new App.semanticUI();
  }

}))({ el: document.body });

$(function(){
  App.init();
});
