App.Views.ProjectItem = Backbone.View.extend({

  tagName: 'tr',

  initialize: function(){
    _.bindAll(this, 'render');
  },

  render: function(){
    this.$el.html(JST['projects/item'](this.model));
  }

});
