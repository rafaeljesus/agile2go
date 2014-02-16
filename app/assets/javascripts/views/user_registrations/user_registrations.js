App.Views.UserRegistrations = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'saved', 'onModelError');
    this.current_user = options.current_user;
    this.model = new App.Models.UserRegistration({});
    this.model.on('error', this.onModelError);
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
    if (!this.model.isValid()) this.model.trigger('error');
    else this.model.save({}, { success: this.saved });
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

  savedSuccess: function(){
     var message = I18n.t('registrations.signed_up');
     new FlashMessages({ message: message }).success();
  },

  onModelError: function(model, response, options){
    var attributesWithErrors = response ? JSON.parse(response.responseText).errors : this.model.validationError;
    new ErrorView({ el: $('form'), attributesWithErrors: attributesWithErrors }).render();
  },

  rootPath: function(){
    window.location.hash = '#';
  },

});
