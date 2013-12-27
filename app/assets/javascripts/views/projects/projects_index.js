App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize : function(){
   _.bindAll(this, 'render');
  },

  render : function(){
    this.renderTemplate();
    return this;
  },

  renderTemplate : function(){
   this.$el.html(JST['projects/index']({ projects: this.collection }));
  }

});
