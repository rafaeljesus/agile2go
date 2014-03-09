App.Collections.Dashboards = Backbone.Collection.extend({
  url: '/dashboard',
  model: App.Models.Dashboard,

  parse: function(response){
    return response.dashboards;
  }
});
