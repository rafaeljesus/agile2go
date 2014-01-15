App.Views.Menu = Backbone.View.extend({
  el: '#menu',

  initialize: function(options){
    _.bindAll(this, 'render');
    this.user_session = options.user_session
    this.render();
  },

  render: function(){
    this.$el.html(JST['layouts/menu']({ user_session: this.user_session.toJSON() }));
    return this;
  }
});
