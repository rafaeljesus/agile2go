App.Views.Menu = Backbone.View.extend({
  el: '#menu',

  initialize: function(options){
    _.bindAll(this, 'render');
    this.current_user = options.current_user
    this.current_user.on('change:signed_in', this.render, this);
    this.render();
  },

  render: function(){
    this.$el.html(JST['layouts/menu']({ current_user: this.current_user.toJSON() }));
    return this;
  }
});
