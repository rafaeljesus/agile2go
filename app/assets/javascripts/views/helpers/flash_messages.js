var FlashMessages = Backbone.View.extend({
  el: '#messages',

  initialize: function(options){
    this.message = options.message;
  },

  template: JST['messages'],

  success: function(){
    var config = { type: 'Success', color: 'blue', message: this.message };
    this.$el.show().html(this.template(config));
    this.empty();
  },

  error: function(){
    var config = { type: 'Error', color: 'red', message: this.message };
    this.$el.show().html(this.template(config));
    this.empty();
  },

  empty: function(){
    var self = this;
    setTimeout(function(){
      self.$el.empty();
    }, 2000);
  }

});
