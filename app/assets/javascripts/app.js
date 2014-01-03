window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new this.Utils();
    new this.Routers.UserSessions();
    new this.Routers.Projects();
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }
}
$(function(){
  App.initialize();
});
