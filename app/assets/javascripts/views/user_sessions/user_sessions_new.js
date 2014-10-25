App.Views.UserSessionsNew = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {

  template: JST['user_sessions/new'],

  initialize: function(options) {
    _.bindAll(this, 'render', 'authenticated');
    this.current_user = options.current_user;
    this.newModel();
    this.observe();
  },

  events: {
    'click .submit': 'authenticate',
    'click .twitter': 'authenticate_with_twitter',
    'click .facebook': 'authenticate_with_facebook',
    'click .google': 'authenticate_with_google',
    'click .github': 'authenticate_with_github'
  },

  authenticate_with_facebook: function(e) {
    e.preventDefault();
    var options = { view: this, authenticatedCallback: this.authenticatedCallback };
    new FacebookConnect(options).login();
  },

  authenticate_with_twitter: function(e) {
    e.preventDefault();
    this.omniauthConnect('twitter', e);
  },

  authenticate_with_google: function(e) {
    e.preventDefault();
    this.omniauthConnect('google', e);
  },

  authenticate_with_github: function(e) {
    e.preventDefault();
    this.omniauthConnect('github', e);
  },

  authenticate: function(e) {
    e.preventDefault();
    this.commit();
    this.model.save({}, { success: this.authenticated });
  },

  omniauthConnect: function(provider, e) {
    var options = {
      view: this,
      url: e.target.href,
      provider: provider,
      authenticatedCallback: this.authenticatedCallback
    };
    new OmniauthConnect(options).exec();
  },

  commit: function() {
    var email = this.$("#email").val()
    , password = this.$("#password").val()
    , options = { email: email, password: password };
    this.model.set(options);
  },

  authenticated: function(model, response, options) {
    var attrs = { signed_in: true, id: model.attributes.session.user_id }
    this.authenticatedCallback(this, attrs);
  },

  authenticatedCallback: function(view, attrs) {
    view.current_user.set(attrs);
    view.rootPath()
    if (!attrs) return;
    var message = I18n.t('sessions.signed_in');
    view.successMessage(message);
  },

  onModelError: function(model, response, options) {
    this.clearOldErrors();
    var jsonResponse = JSON.parse(response.responseText);
    this.errorMessage(jsonResponse.errors.base);
  },

  clearOldErrors: function() {
    this.$('.error').removeClass('error');
    this.$('div.ui.red.pointing.above.ui.label').remove();
  },

  newModel: function() {
    this.model = new App.Models.UserSession();
  }

})));
