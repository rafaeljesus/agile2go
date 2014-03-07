App.Views.UserSessionsNew = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render', 'authenticated');
    this.current_user = options.current_user;
    this.newModel();
    this.observe();
  },

  template: JST['user_sessions/new'],

  events: {
    'click .submit': 'authenticate'
  },

  newModel: function(){
    this.model = new App.Models.UserSession({});
  },

  authenticate: function(e){
    e.preventDefault();
    this.commit();
    if(this.model.isValid()){ this.model.save({}, { success: this.authenticated }); };
  },

  commit: function(){
    var email = this.$("#email").val()
    , password = this.$("#password").val();
    this.model.set({ email: email, password: password });
  },

  authenticated: function(model, response, options){
    this.current_user.set({ signed_in: true, id: model.attributes.session.user_id });
    this.rootPath();
    var message = I18n.t('sessions.signed_in');
    this.successMessage(message);
  },

  onModelError: function(model, response, options){
    this.clearOldErrors();
    var jsonResponse = JSON.parse(response.responseText);
    this.errorMessage(jsonResponse.errors.base);
  },

  clearOldErrors: function() {
    this.$('.error').removeClass('error');
    this.$('div.ui.red.pointing.above.ui.label').remove();
  }

})));
