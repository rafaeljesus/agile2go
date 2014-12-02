App.Views.UserRegistrationsSerialize = (function() {

  function UserRegistrationsSerialize(view) {
    this.view = view;
  }

  UserRegistrationsSerialize.prototype.toAttributes = function() {
    return {
      first_name: this.view.$("#first-name").val(),
      last_name: this.view.$("#last-name").val(),
      email: this.view.$("#email").val(),
      password: this.view.$("#password").val()
    }
  };

  return UserRegistrationsSerialize;

})();
