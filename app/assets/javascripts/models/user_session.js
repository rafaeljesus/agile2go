App.Models.UserSession = Backbone.Model.extend({
  urlRoot: 'user_sessions',

  validate: function(attrs, options){
    var errors;
    if(!attrs.email){
      (errors = errors || {}).email = ["can't be blank"];
    };
    if(!attrs.password){
      (errors = errors || {}).password = ["can't be blank"];
    };
    if(errors) return errors;
  }

});
