var FlashMessages = Backbone.View.extend({
  el: '#messages',

  initialize: function(options){
    this.message = options.message;
  },

  success: function(){
    this.$el
      .show()
      .html(JST['messages']({ type: 'Success', color: 'blue', message: this.message }))
      .fadeOut(4000);
  },

  error: function(){
    this.$el
      .show()
      .html(JST['messages']({ type: 'Error', color: 'red', message: this.message }))
      .fadeOut(4000);
  }

});
