App.Collections.UserRegistrations = Backbone.Collection.extend({
  url: '/users',
  model: App.Models.UserRegistration
});
