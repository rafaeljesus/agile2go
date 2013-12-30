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
    self.collection.fetch().done(function(data){
      var view = new App.Views.ProjectsIndex({ collection : data });
      self.swap(view);
    });
  },

  new : function(){
    var view = new App.Views.ProjectForm();
    this.swap(view);
  },

  edit : function(id){
    var self = this;
    self.collection.fetch().done(function(project){
      var model = self.collection.findWhere({ id: project[0].id }),
          view = new App.Views.ProjectForm({ model: model });
      self.swap(view);
    });
  }

});
