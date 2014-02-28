App.Collections.Sprints = Backbone.Collection.extend({
  url: '/sprints',
  model: App.Models.Sprint,

  formatDate: function(sprints){
    _.each(sprints, function(model){
      model.start_date = moment(model.start_date).calendar();
    });
  },

  parse: function(response){
    this.project = response.project;
    this.formatDate(response.sprints);
    return response.sprints;
  }

});
