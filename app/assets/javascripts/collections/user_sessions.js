var App.Collections.UserSessions = Backbone.Collection.extend({
  url: '/user_sessions',
  model: App.Models.UserSession,
});
