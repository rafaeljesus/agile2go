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
    this.model.save({}, { success: this.saved, error: this.notSaved });
    return false;
  },

  commit: function(){
    var name = this.$("input[name='user[name]']").val(),
        email = this.$("input[name='user[email]']").val(),
        password = this.$("input[name='user[password]']").val(),
        password_confirmation = this.$("input[name='user[password_confirmation]']").val();
    this.model.set({ name: name, email: email, password: password, password_confirmation: password_confirmation });
  },

  saved: function(model, response, options) {
     this.current_user.set(model.attributes, { signed_in: true });
     this.rootPath();
     this.savedMsg();
  },

  notSaved: function(model, xhr, options){
    var errors = JSON.parse(xhr.responseText).errors;
    new FlashMessages({ message: errors }).error();
  },

  rootPath: function(){
    window.location.hash = '/';
  },

  savedMsg: function(){
     var message = 'Welcome. You successfully created a account';
     new FlashMessages({ message: message }).success();
  }

});
