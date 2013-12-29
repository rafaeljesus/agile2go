window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new App.Routers.Projects();
    if (!Backbone.history.started) {
      Backbone.history.start({ pushState: true });
      Backbone.history.started = true;
    }
  }
}
$(function(){
  App.initialize();
});
