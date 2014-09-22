App.Mixins.UserSignedInCheck = {

  checkUserSignedIn: function() {
    if (!this.userSignedIn()) return;
    var message = 'You are are already logged';
    new FlashMessages({ message: message }).error();
    window.location.hash = '#dashboard';
    throw new Error(message);
  },

  userSignedIn: function() {
    return this.current_user.signedIn();
  }

};
