App.Routers.Sprints = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.Permissions, {
  initialize: function(options){
    this.el = $('#container');
    this.current_user = options.current_user;
    this.collection = new App.Collections.Sprints({});
    this.projects = new App.Collections.Projects({});
  },

  routes: {
    'sprints': 'index',
    'sprints/new': 'new',
    'sprints/:id/edit': 'edit'
  },

  index: function(){
    this.authorize();
    this.collection.fetch({});
    var view = new App.Views.SprintsIndex({ collection: this.collection });
    this.swap(view);
  },

  new: function(){
    this.authorize();
    this.projects.fetch({});
    var view = new App.Views.SprintForm({ projects: this.projects });
    this.swap(view);
  },

  edit: function(id){
    this.authorize();
    var self = this;
    $.getJSON("/sprints/" + id + "/edit").then(function(json){
      var model = new App.Models.Sprint(json[0], { parse: true });
      self.projects = new App.Collections.Projects(json[1]);
      var view = new App.Views.SprintForm({ model: model, projects: self.projects });
      self.swap(view);
    });
  }

}));
