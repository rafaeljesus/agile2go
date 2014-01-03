App.Models.UserSession = Backbone.Model.extend({
  urlRoot: '/user_sessions/new',

  defaults: {
    "email": "",
    "password": ""
  }

});
