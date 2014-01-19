App.Models.UserRegistration = Backbone.Model.extend({
  urlRoot: 'users',

  validate: function(attrs, options){
    if(attrs.name == ''){ return "name can't be blank"};
    if(attrs.email == ''){ return "email can't be blank"};
    if(attrs.password == ''){ return "password can't be blank"};
    if(attrs.password_confirmation == ''){ return "password confirmation can't be blank"};
  }

});
