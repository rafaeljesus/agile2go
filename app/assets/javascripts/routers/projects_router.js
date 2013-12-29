App.Routers.Projects = Support.SwappingRouter.extend({
  initialize : function(collection){
    this.el = $('#projects');
    this.collection = collection;
  },

  routes : {
    "projects" : "index",
    "projects/new" : "new",
    "projects/:id/edit" : 'edit'
  },

  index : function(){
    var view = new App.Views.ProjectsIndex({ collection : this.collection });
    this.swap(view);
  },

  new : function(){
    var view = new App.Views.ProjectsNew();
    this.swap(view);
  },

  edit : function(id){
    // var collection = new App.Collections.Projects();
    // collection.reset(collection);
    // project = collection.get(id);
    var view = new App.Views.ProjectEdit({ id : id });
    this.swap(view);
  }

});
