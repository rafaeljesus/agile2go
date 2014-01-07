App.Collections.Projects = Backbone.Collection.extend({
  url: '/projects',
  model: App.Models.Project,

  parse: function(response){
    this.assignedUsers = response.assignedUsers;
    return response.projects;
  }
});
