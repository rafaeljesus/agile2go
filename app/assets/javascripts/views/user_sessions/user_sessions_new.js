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
    'click .submit': 'authenticate',
    'click .twitter': 'authenticate_with_twitter',
    'click .facebook': 'authenticate_with_facebook'
  },

  authenticate_with_twitter: function(e){
    e.preventDefault();
    var options = { view: this, url: e.target.href, authenticatedCallback: this.authenticatedCallback };
    new TwitterConnect(options).exec();
  },

  authenticate_with_facebook: function(e){
    e.preventDefault();
    var options = { view: this, authenticatedCallback: this.authenticatedCallback };
    new FacebookConnect(options).login();
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
    var attrs = { signed_in: true, id: model.attributes.session.user_id };
    this.authenticatedCallback(attrs, this);
  },

  authenticatedCallback: function(view, attrs){
    view.current_user.set(attrs);
    view.rootPath()
    var message = I18n.t('sessions.signed_in');
    view.successMessage(message);
  },

  onModelError: function(model, response, options){
    this.clearOldErrors();
    var jsonResponse = JSON.parse(response.responseText);
    this.errorMessage(jsonResponse.errors.base);
  },

  clearOldErrors: function() {
    this.$('.error').removeClass('error');
    this.$('div.ui.red.pointing.above.ui.label').remove();
  },

  newModel: function(){
    this.model = new App.Models.UserSession({});
  }

})));
