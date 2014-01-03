App.Routers.UserSessions = Support.SwappingRouter.extend({
  initialize: function(){
    this.el = $('#container');
  },

  routes: {
    "auth/sign_in": "signIn"
  },

  signIn: function(){
    var view = new App.Views.UserSessionsSignIn();
    this.swap(view);
  }

});
