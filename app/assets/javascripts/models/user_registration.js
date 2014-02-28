App.Models.UserRegistration = Backbone.Model.extend({
  urlRoot: 'users',

  validate: function(attrs, options){
    var errors;
    if(!attrs.name){
      (errors = errors || {}).name = ["can't be blank"];
    };
    if(!attrs.email){
      (errors = errors || {}).email = ["can't be blank"];
    };
    if(!attrs.password){
      (errors = errors || {}).password = ["can't be blank"];
    };
    if(!attrs.password_confirmation){
      (errors = errors || {}).password_confirmation = ["can't be blank"];
    };
    if(errors) return errors;
  }

});
