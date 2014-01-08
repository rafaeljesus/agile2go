App.Collections.Projects = Backbone.Collection.extend({
  url: '/projects',
  model: App.Models.Project,

  parse: function(response){
    if(response.assignedUsers) this.assignedUsers = response.assignedUsers;
    return response.projects;
  }
});
