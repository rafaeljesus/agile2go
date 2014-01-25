App.Views.UserSessionsNew = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'authenticated', 'notAuthenticated');
    this.current_user = options.current_user;
    this.model = new App.Models.UserSession({});
  },

  events: {
    'click .submit': 'authenticate'
  },

  render: function(){
    this.$el.html(JST['user_sessions/new']());
    return this;
  },

  authenticate: function(e){
    e.preventDefault();
    this.commit();
    if(!this.model.isValid()){
      this.formValidationError();
    } else {
      this.model.save({}, { success: this.authenticated, error: this.notAuthenticated });
    }
  },

  commit: function(){
    var email = this.$("input[name='user[email]']").val(),
        password = this.$("input[name='user[password]']").val();
    this.model.set({ email: email, password: password });
  },

  authenticated: function(model, response, options){
    this.current_user.set({ signed_in: true, id: model.attributes.session.user_id });
    this.rootPath();
    this.authenticatedSuccess();
  },

  notAuthenticated: function(model, xhr, options){
    var attributesWithErrors = JSON.parse(xhr.responseText);
    _.each(attributesWithErrors, function(errors, attribute){
      new FlashMessages({ message: errors.base  }).error();
    });
  },

  authenticatedSuccess: function(){
     var message = 'You successfully logged in';
     new FlashMessages({ message: message }).success();
  },

  formValidationError: function(){
    var message = this.model.validationError;
    new FlashMessages({ message: message }).error();
  },

  rootPath: function(){
    window.location.hash = '/';
  }

});
