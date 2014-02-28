App.Views.UserRegistrations = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render', 'saved');
    this.current_user = options.current_user;
    this.model = new App.Models.UserRegistration({});
    this.observe();
  },

  template: JST['user_registrations/new'],

  events: {
    'submit': 'save'
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    if(this.model.isValid()){ this.model.save({}, { success: this.saved }); };
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
     var message = I18n.t('registrations.signed_up');
     this.successMessage(message);
  }

})));
