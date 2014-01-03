App.Views.SiteIndex = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render')
  },

  render: function(){
    this.$el.append(JST['site/index']);
    return this;
  }
});
