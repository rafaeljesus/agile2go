var App = new (Backbone.View.extend({
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Mixins: {},

  init: function(){
    new App.HandlebarsHelpers().withI18n();
    var current_user = new App.Models.CurrentUser({});
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
    new App.updateActiveNav();
    new Searchable();
  },

  start: function(){
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  },

  updateActiveNav: function(){
    $(window).on('hashchange', function(e){
      if(App._isCurrentHash('projects')){
        $("a[href='#sprints'], a[href='#tasks'], a[href='#dashboard']").removeClass('active');
        $("a[href='#projects']").addClass('active');
      } else if (App._isCurrentHash('sprints')){
        $("a[href='#projects'], a[href='#tasks'], a[href='#dashboard']").removeClass('active');
        $("a[href='#sprints']").addClass('active');
      } else if (App._isCurrentHash('tasks')){
        $("a[href='#projects'], a[href='#sprints'], a[href='#dashboard']").removeClass('active');
        $("a[href='#tasks']").addClass('active');
      } else if (App._isCurrentHash('dashboard')){
        $("a[href='#projects'], a[href='#sprints'], a[href='#tasks']").removeClass('active');
        $("a[href='#dashboard']").addClass('active');
      }
    });
  },

  _isCurrentHash: function(name){
    return window.location.hash == '#' + name;
  }

}))({ el: document.body });

$(function(){
  App.init();
});
