App.Views.SiteIndex = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render')
  },

  render: function(){
    this.$el.html(JST['site/index']);
    return this;
  }
});
