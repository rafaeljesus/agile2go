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
    var view = new App.Views.UserSessionsNew({ current_user: this.current_user });
    this.swap(view);
  },

  destroy: function() {
    var view = new App.Views.UserSessionsDestroy({ current_user: this.current_user });
    view.destroy();
    this.swap(view);
  }

}));
