App.Collections.Tasks = Backbone.Collection.extend({
  url: 'tasks',
  model: App.Models.Task,

  parse: function(response){
    this.sprint = response.sprint;
    return response.tasks;
  }

});
