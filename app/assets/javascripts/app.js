window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(collection) {
    // new App.Utils();
    new App.Routers.Projects(collection);
    if (!Backbone.history.started) {
      Backbone.history.start({ pushState: true });
      Backbone.history.started = true;
    }
  }
}
$(function(){
  $.getJSON('/projects').done(function(data){
    App.initialize(data);
  });
});
