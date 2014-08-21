App.Mixins.Permissions = {
  authorize: function(){
    if (!this.current_user || !this.current_user.get('signed_in')) {
      window.location.hash = '#sessions/new';
      var message = 'You are not logged to access site content';
      new FlashMessages({ message: message }).error();
      throw new Error(message);
    }
  }
}
