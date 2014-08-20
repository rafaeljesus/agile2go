var App.Collections.Sprints = Backbone.Collection.extend({
  url: '/sprints',
  model: App.Models.Sprint,

  parse: function(response){
    return response.sprints;
  }

});
