App.Routers.Sprints = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.Permissions, {
  initialize: function(options){
    this.el = $('#container');
    this.current_user = options.current_user;
    this.projects = new App.Collections.Projects({});
  },

  routes: {
    'sprints': 'index',
    'sprints/new': 'new'
  },

  new: function(){
    this.authorize();
    this.projects.fetch({});
    var view = new App.Views.SprintNew({ projects: this.projects });
    this.swap(view);
  }

}));
