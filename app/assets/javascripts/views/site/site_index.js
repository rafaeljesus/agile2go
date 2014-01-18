App.Views.SiteIndex = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render');
    this.current_user = options.current_user;
    this.bindTo(this.current_user, 'change:signed_in', this.render)
  },

  render: function(){
    if(this.current_user.get('signed_in')) this.renderTemplate();
    return this;
  },

  renderTemplate: function(){
    this.$el.html(JST['site/index']({ current_user: this.current_user }));
  }
});
