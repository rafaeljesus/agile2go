App.Models.UserSession = Backbone.Model.extend({
  urlRoot: 'user_sessions',

  validate: function(attrs, options){
    if (attrs.email == '') { return "email can't be blank" };
    if (attrs.password == '') { return "password can't be blank" };
  }

});
