var App = new (Backbone.View.extend({
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},

  setI18nHbsHelper: function(){
    Handlebars.registerHelper('t', function(i18n_key) {
      var result = I18n.t(i18n_key);
      return new Handlebars.SafeString(result);
    });
  },

  start: function(){
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  },

  init: function(){
    new App.setI18nHbsHelper();
    var current_user = new App.Models.CurrentUser({});
    var injector = { current_user: current_user };
    new App.Views.Menu(injector);
    new App.Routers.Site(injector);
    new App.Routers.UserRegistrations(injector);
    new App.Routers.UserSessions(injector);
    new App.Routers.Projects(injector);
    new App.Routers.Sprints(injector);
    new App.start();
  }

}))({ el: document.body });

$(function(){
  App.init();
  $('.ui.dropdown').dropdown();
  $('.ui.checkbox').checkbox();
  $('.ui.popup').popup();
});
