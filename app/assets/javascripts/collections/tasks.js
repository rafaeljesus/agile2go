var App.Collections.Tasks = Backbone.Collection.extend({
  url: 'tasks',
  model: App.Models.Task,

  parse: function(response){
    return response.tasks;
  }

});
