App.Views.UserSessionsDestroy = Support.CompositeView.extend({

  initialize: function(options) {
    _.bindAll(this, 'destroyed');
    this.current_user = options.current_user;
  },

  destroy: function() {
    var content = {
      url: 'user_sessions',
      type: 'post',
      dataType: 'json',
      data: {_method: 'delete'}
    }
    $.ajax(content).done(this.destroyed);
    if (this.current_user.signedInWithFacebook()) {
      new FacebookConnect().logout();
    }
  },

  destroyed: function(data) {
    this.current_user.set({ signed_in: false });
    this.current_user.removeSession();
    this.logoutSuccess();
    this.rootPath();
  },

  logoutSuccess: function() {
    var message = 'You successfully logged out';
    new FlashMessages({ message: message }).success();
  },

  rootPath: function() {
    window.location.hash = '#';
  }

});
