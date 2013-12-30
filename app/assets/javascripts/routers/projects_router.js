App.Routers.Projects = Support.SwappingRouter.extend({
  initialize : function(){
    this.el = $('#projects');
    this.collection = new App.Collections.Projects();
  },

  routes : {
    "projects" : "index",
    "projects/new" : "new",
    "projects/:id/edit" : 'edit'
  },

  index : function(){
    var self = this;
    self.collection.fetch().done(function(resp){
      var view = new App.Views.ProjectsIndex({ collection : resp });
      self.swap(view);
    });
  },

  new : function(){
    var self = this,
        users = new App.Collections.Users();
    users.fetch().done(function(resp){
      users.reset(resp);
      var view = new App.Views.ProjectNew({ users: users });
      self.swap(view);
    });
  },

  edit : function(id){
    var self = this;
    $.getJSON("/projects/" + id  + "/edit").done(function(json){
      var users = new App.Collections.Users(),
          model = new App.Models.Project(json[0]);
      users.reset(json[1]);
      var view = new App.Views.ProjectEdit({ model: model, users: users });
      self.swap(view);
    });
  }

});
