App.Routers.Projects = Support.SwappingRouter.extend({
  initialize : function(){
    this.el = $('#projects');
  },

  routes : {
    "" : "index"
  },

  index : function(){
    var self = this;
    $.getJSON('/projects').done(function(projects){
      self.collection = projects;
      var view = new App.Views.ProjectsIndex({ collection : self.collection });
      self.swap(view);
    });
  }

});
