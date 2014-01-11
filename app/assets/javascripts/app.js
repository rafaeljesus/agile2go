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
    new App.semanticUI();
    new App.Routers.Projects({});
    new App.start();
  }

}))({ el: document.body });

$(function(){
  App.init();
});
