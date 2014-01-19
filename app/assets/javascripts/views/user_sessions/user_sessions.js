App.Views.UserSessions = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'authenticated', 'notAuthenticated');
    this.current_user = options.current_user;
    this.model = new App.Models.UserSession({});
  },

  events: {
    'submit': 'authenticate'
  },

  render: function(){
    this.$el.html(JST['user_sessions/new']);
    return this;
  },

  commit: function(){
    var email = this.$("input[name='user[email]']").val(),
        password = this.$("input[name='user[password]']").val();
    this.model.set({ email: email, password: password });
  },

  authenticate: function(e){
    e.preventDefault();
    this.commit();
    this.model.save({}, { success: this.authenticated, error: this.notAuthenticated });
  },

  authenticated: function(model, response, options){
    this.current_user.set({ signed_in: true });
    this.rootPath();
    this.authenticatedMsg();
  },

  notAuthenticated: function(model, xhr, options){
    var errors = JSON.parse(xhr.responseText).errors;
    new FlashMessages({ message: errors }).error();
  },

  rootPath: function(){
    window.location.hash = '/';
  },

  authenticatedMsg: function(){
     var message = 'You successfully logged in';
     new FlashMessages({ message: message }).success();
  }

});
