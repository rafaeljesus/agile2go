App.Models.CurrentUser = Backbone.Model.extend({
  urlRoot: 'current_user',

  defaults: {
    signed_in: false
  },

  signed_in: function(){
    this.get('signed_in');
  },

  name: function(){
    this.get('name');
  },

  email: function(){
   this.get('email');
  }

});
