App.Views.MenuVertical = Backbone.View.extend({

  el: '#vertical-menu',
  template: JST['layouts/menu_vertical'],

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.current_user = options.current_user;
    this.listenTo(this.current_user, 'change:signed_in', this.render);
  },

  render: function() {
    if (this.current_user.signedIn()) {
      this.$el.html(this.template());
    } else {
      $('#vertical-menu').html('');
    }
    return this;
  }

});
