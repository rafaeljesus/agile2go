App.Collections.Users = Backbone.Collection.extend({
  url: '/users',
  model: App.Models.User,

  parse: function(response){
    return response.users;
  }

});
