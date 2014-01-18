var App = new (Backbone.View.extend({
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

  events: {},

  semanticUI: function(){
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $('.ui.popup').popup();
    $(".rotate").textrotator({ animation: "dissolve", separator: ",", speed: 6000 });
  },

  start: function(){
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  },

  init: function() {
    var current_user = new App.Models.CurrentUser({});
    current_user.fetch({});
    new App.Views.Menu({ current_user: current_user });
    new App.Routers.Site({});
    new App.Routers.UserRegistrations({});
    new App.Routers.Projects({});
    new App.semanticUI();
    new App.start();
 }

}))({ el: document.body });

$(function(){
  App.init();
});
