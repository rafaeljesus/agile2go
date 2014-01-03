App.Views.UserSessionsSignIn = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render', 'signIn');
    this.newUserSession();
  },

  events: {
    'submit': 'signIn'
  },

  render: function(){
    this.$el.html(JST['user_sessions/sign_in']);
    return this;
  },

  signIn: function(e){
    e.preventDefault();
  },

  newUserSession: function(){
    this.userSession = new App.Models.UserSession();
  }

});
