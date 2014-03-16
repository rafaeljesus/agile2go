App.Models.UserRegistration = Backbone.Model.extend({
  urlRoot: 'users',

  parse: function(response){
    if(!response) return;
    return response.user;
  },

  validate: function(attrs, options){
    var errors;
    if(!attrs.name){
      (errors = errors || {}).name = ["can't be blank"];
    };
    if(!attrs.email){
      (errors = errors || {}).email = ["can't be blank"];
    };
    if(errors) return errors;
  }

});
