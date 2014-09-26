var FlashMessages = Backbone.View.extend({
  el: '#messages',

  initialize: function(options) {
    this.message = options.message;
  },

  template: JST['messages'],

  info: function() {
    var options = { type: 'Info', color: 'green', message: this.message };
    this.render(options);
  },

  success: function() {
    var options = { type: 'Success', color: 'blue', message: this.message };
    this.render(options);
  },

  error: function() {
    var options = { type: 'Error', color: 'red', message: this.message };
    this.render(options);
  },

  render: function(options) {
    this.$el.show().html(this.template(options));
    this.empty();
  },

  empty: function() {
    var self = this;
    setTimeout(function(){
      self.$el.empty();
    }, 5000);
  }

});
