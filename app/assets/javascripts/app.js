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
    var session = JSON.parse(sessionStorage.getItem('currentUser')),
        current_user = new App.Models.CurrentUser(session);
    if (!current_user.get('signed_in')) { current_user.fetch({}); }
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
