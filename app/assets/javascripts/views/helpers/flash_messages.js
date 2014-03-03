var FlashMessages = Backbone.View.extend({
  el: '#messages',

  initialize: function(options){
    this.message = options.message;
  },

  template: JST['messages'],

  success: function(){
    this.$el.show().html(this.template({ type: 'Success', color: 'blue', message: this.message })).fadeOut(5000);
  },

  error: function(){
    this.$el.show().html(this.template({ type: 'Error', color: 'red', message: this.message })).fadeOut(5000)
  }

});
