var App = new (Backbone.View.extend({
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},

  init: function(){
    new App.HandlebarsHelpers().withI18n();
    var current_user = new App.Models.CurrentUser({});
    // FIXME emit a user:loggedin event
    var options = { current_user: current_user };
    new App.Views.Menu(options);
    new App.Routers.Site(options);
    new App.Routers.UserRegistrations(options);
    new App.Routers.UserSessions(options);
    new App.Routers.Projects(options);
    new App.Routers.Sprints(options);
    new App.Routers.Tasks(options);
    new App.Routers.Dashboards(options);
    new App.start();
    new ActiveNav();
  },

  start: function(){
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }

}))({ el: document.body });

$(function(){
  App.init();
});
