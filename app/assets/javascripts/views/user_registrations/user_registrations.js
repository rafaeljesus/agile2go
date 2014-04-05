App.Views.UserRegistrations = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render', 'saved');
    this.current_user = options.current_user;
    this.model = options.model || this.newModel();
    this.observe();
  },

  template: JST['user_registrations/new'],

  serializeData: function(){
    return { current_user: this.model.toJSON() }
  },

  events: {
    'submit': 'save'
  },

  onRender: function(){
    if (this.model.get('id')) {
      this.$('#name').attr('disabled', 'disabled');
      this.$('#email').attr('disabled', 'disabled');
    }
  },

  newModel: function(){
    return new App.Models.UserRegistration({});
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    if(this.model.isValid()){ this.model.save({}, { success: this.saved }); };
    return false;
  },

  commit: function(){
    var name    = this.$("#name").val()
    , email     = this.$("#email").val()
    , password  = this.$("#password").val()
    , password_confirmation = this.$("#password-confirmation").val()
    , options = { name: name, email: email, password: password, password_confirmation: password_confirmation };
    this.model.set(options);
  },

  saved: function(model, response, options) {
     this.current_user.set({ signed_in: true });
     this.current_user.set(model.attributes.user);
     this.rootPath();
     var message = I18n.t('registrations.signed_up');
     this.successMessage(message);
  }

})));
