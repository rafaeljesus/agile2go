App.Collections.CurrentUser = Backbone.Collection.extend({
  url: 'current_user',
  model: App.Models.CurrentUser,
  // sessionStorage: new Backbone.SessionStorage('current-user')
});
