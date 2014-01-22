App.Views.Menu = Backbone.View.extend({
  el: '#menu',

  initialize: function(options){
    _.bindAll(this, 'render');
    this.current_user = options.current_user
    this.listenTo(this.current_user, 'change:signed_in', this.render);
    this.render();
  },

  render: function(){
    this.$el.html(JST['layouts/menu']({ current_user: this.current_user.toJSON() }));
    return this;
  }
});
