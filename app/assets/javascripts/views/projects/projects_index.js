App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize : function(){
   _.bindAll(this, 'render');
   this.addPrettyDateHelper();
  },

  render : function(){
    this.$el.html(JST['projects/index'](this.collection));
    return this;
  },

  addPrettyDateHelper : function() {
    Handlebars.registerHelper('prettyDate', function(created_at) {
        return $.timeago(created_at);
    });
  }

});
