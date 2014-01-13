App.Routers.Projects = Support.SwappingRouter.extend({
  initialize: function(){
    _.bindAll(this, 'index');
    this.el = $('#container');
    this.collection = new App.Collections.Projects({});
    this.users = new App.Collections.Users({});
  },

  routes: {
    "projects" : "index",
    "projects/new" : "new",
    "projects/:id/edit" : 'edit'
  },

  index: function(){
    this.collection.fetch({});
    var view = new App.Views.ProjectsIndex({ collection : this.collection });
    this.swap(view);
  },

  new: function(){
    this.users.fetch({});
    var view = new App.Views.ProjectNew({ users: this.users });
    this.swap(view);
  },

  edit: function(id){
    var self = this;
    $.getJSON("/projects/" + id  + "/edit").done(function(json){
      var model = new App.Models.Project(json[0]);
      this.users = new App.Collections.Users(json[1]);
      var view = new App.Views.ProjectEdit({ model: model, users: this.users });
      self.swap(view);
    });
  }

});
