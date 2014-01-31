App.Views.UserRegistrations = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'saved', 'notSaved');
    this.current_user = options.current_user;
    this.model = new App.Models.UserRegistration({});
  },

  events: {
    'submit': 'save'
  },

  render: function(){
    this.$el.html(JST['user_registrations/new']);
    return this;
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    if (!this.model.isValid()) {
      this.formValidationError();
    } else {
      this.model.save({}, { success: this.saved, error: this.notSaved });
    }
    return false;
  },

  commit: function(){
    var name = this.$("#name").val(),
        email = this.$("#email").val(),
        password = this.$("#password").val(),
        password_confirmation = this.$("#password-confirmation").val();
    this.model.set({ name: name, email: email, password: password, password_confirmation: password_confirmation });
  },

  saved: function(model, response, options) {
     this.current_user.set({ signed_in: true });
     this.current_user.set(model.attributes.user);
     this.rootPath();
     this.savedSuccess();
  },

  notSaved: function(model, xhr, options){
    var errors = JSON.parse(xhr.responseText).errors;
    new FlashMessages({ message: errors }).error();
  },

  rootPath: function(){
    window.location.hash = '#';
  },

  savedSuccess: function(){
     var message = 'Welcome. You successfully you have signed up successfully';
     new FlashMessages({ message: message }).success();
  },

  formValidationError: function(){
    var message = this.model.validationError;
    new FlashMessages({ message: message }).error();
  }

});
