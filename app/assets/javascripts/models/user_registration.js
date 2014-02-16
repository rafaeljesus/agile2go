App.Models.UserRegistration = Backbone.Model.extend({
  urlRoot: 'users',

  validate: function(attrs, options){
    var errors;
    if(!attrs.name){
      errors = errors || {};
      errors.name = ["can't be blank"];
    };
    if(!attrs.email){
      errors = errors || {};
      errors.email = ["can't be blank"];
    };
    if(!attrs.password){
      errors = errors || {};
      errors.password = ["can't be blank"];
    };
    if(!attrs.password_confirmation){
      errors = errors || {};
      errors.password_confirmation = ["can't be blank"];
    };
  }

});
