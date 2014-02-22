App.Collections.Projects = Backbone.Collection.extend({
  url: '/projects',
  model: App.Models.Project,

  firstById: function(assigneeId){
    var self = this;
    return _.first(_.map(assigneeId, function(id){
      return self.get({ id: id });
    }));
  },

  parse: function(response){
    if(response.assignedUsers) this.assignedUsers = response.assignedUsers;
    return response.projects;
  }
});
