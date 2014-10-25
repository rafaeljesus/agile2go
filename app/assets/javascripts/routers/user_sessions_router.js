App.Routers.UserSessions = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.UserSignedInCheck, {

  initialize: function(options) {
    this.el = document.querySelector('#container');
    this.current_user = options.current_user;
  },

  routes: {
    'sessions/new': 'new',
    'sessions/destroy': 'destroy'
  },

  new: function() {
    this.checkUserSignedIn();
    var options = { current_user: this.current_user }
    var view = new App.Views.UserSessionsNew(options);
    this.swap(view);
  },

  destroy: function() {
    var options = { current_user: this.current_user }
    var view = new App.Views.UserSessionsDestroy(options);
    view.destroy();
    this.swap(view);
  }

}));
