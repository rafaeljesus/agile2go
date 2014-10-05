App.Collections.Projects = Backbone.Collection.extend({
  url: '/projects',
  model: App.Models.Project,

  parse: function(response) {
    if (response.user_ids) {
      this.user_ids = response.user_ids;
    }
    return response;
  }
});
