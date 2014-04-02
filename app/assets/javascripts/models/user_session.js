App.Models.UserSession = Backbone.Model.extend({
  urlRoot: 'user_sessions',

  authenticate_with_twitter: function(){
    $.getJSON('/auth/twitter').done(function(res){
      console.log('done');
    }).fail(function(error){
      console.log('fail');
    });
  },

  validate: function(attrs, options){
    var errors;
    if(this.url() != this.urlRoot) return;
    if(!attrs.email){
      (errors = errors || {}).email = ["can't be blank"];
    };
    if(!attrs.password){
      (errors = errors || {}).password = ["can't be blank"];
    };
    if(errors) return errors;
  }

});
