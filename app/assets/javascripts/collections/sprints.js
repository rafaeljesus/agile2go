App.Collections.Sprints = Backbone.Collection.extend({
  url: '/sprints',
  model: App.Models.Sprint,

  parse: function(response){
    this.project = response.project;
    return response.sprints;
  }

});
