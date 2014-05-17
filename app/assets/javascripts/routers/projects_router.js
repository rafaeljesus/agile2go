App.Routers.Projects = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.Permissions, {
  initialize: function(options){
    this.el = $('#container');
    this.current_user = options.current_user;
    this.collection = new App.Collections.Projects({});
    this.users = new App.Collections.Users({});
   },

  routes: {
    'projects': 'index',
    'projects/new': 'new',
    'projects/:id/edit': 'edit'
  },

   index: function(){
    this.authorize();
    this.collection.fetch({});
    var view = new App.Views.ProjectsIndex({ collection : this.collection });
    this.swap(view);
  },

  new: function(){
    this.authorize();
    this.users.fetch({});
    var view = new App.Views.ProjectForm({ users: this.users });
    this.swap(view);
  },

  edit: function(id){
    this.authorize();
    var self = this;
    $.getJSON("/projects/" + id  + "/edit").then(function(json){
      var model = new App.Models.Project(json[0]);
      this.users = new App.Collections.Users(json[1]);
      var view = new App.Views.ProjectForm({ model: model, users: this.users });
      self.swap(view);
    });
  }

}));
