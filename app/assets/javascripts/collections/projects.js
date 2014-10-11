App.Collections.Projects = Backbone.Collection.extend({
  url: '/projects',
  model: App.Models.Project,

  parse: function(response) {
    this.user_ids = response.user_ids;
    return response;
  }

});
