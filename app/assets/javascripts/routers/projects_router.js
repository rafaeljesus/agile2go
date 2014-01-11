App.Routers.Projects = Support.SwappingRouter.extend({
  initialize : function(){
    _.bindAll(this, 'index');
    this.el = $('#container');
    this.collection = new App.Collections.Projects({});
  },

  routes : {
    "projects" : "index",
    "project/new" : "new",
    "projects/:id/edit" : 'edit'
  },

  index : function(){
    var self = this;
    self.collection.fetch({
      success: function(collection){
        if (collection.length == 0) { window.location.hash = '#/project/new'; return; }
        var view = new App.Views.ProjectsIndex({ collection : collection });
        self.swap(view);
      }
    });
  },

  new : function(){
    var self = this,
        users = new App.Collections.Users();
    users.fetch({
      success: function(users){
        var view = new App.Views.ProjectNew({ users: users });
        self.swap(view);
      }
    });
  },

  edit : function(id){
    var self = this;
    $.getJSON("/projects/" + id  + "/edit").done(function(json){
      var model = new App.Models.Project(json[0]),
          users = new App.Collections.Users(json[1]);
      var view = new App.Views.ProjectEdit({ model: model, users: users });
      self.swap(view);
    });
  }

});
