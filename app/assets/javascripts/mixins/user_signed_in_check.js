App.Mixins.UserSignedInCheck = {

  userSignedInCheck: function() {
    if (!this.current_user.signedIn()) return;
    window.location.hash = 'dashboard';
    var message = 'You are already logged in.';
    new FlashMessages({ message: message }).success();
    throw new Error(message);
  }

};
