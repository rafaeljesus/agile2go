var App = new (Backbone.View.extend({
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  semanticUI: function(){
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $('.ui.popup').popup();
    $('.rotate').textrotator({ animation: "dissolve", separator: ",", speed: 6000 });
  },

  start: function(){
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  },

  init: function(){
    var session = JSON.parse(sessionStorage.getItem('currentUser'));
    var current_user = new App.Models.CurrentUser(session);
    if (!current_user.get('signed_in')) { current_user.fetch({}); }
    new App.Views.Menu({ current_user: current_user });
    new App.Routers.Site({ current_user: current_user });
    new App.Routers.UserRegistrations({ current_user: current_user });
    new App.Routers.UserSessions({ current_user: current_user });
    new App.Routers.Projects({});
    new App.start();
    new App.semanticUI();
  }

}))({ el: document.body });

$(function(){
  App.init();
});
