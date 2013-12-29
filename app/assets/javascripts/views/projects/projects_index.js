App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize : function(){
   _.bindAll(this, 'render');
   this.addPrettyDateHelper();
  },

  render : function(){
    var self = this;
    self.collection.fetch().done(function(data){
      self.$el.html(JST['projects/index'](data));
    });
    return this;
  },

  addPrettyDateHelper : function() {
    Handlebars.registerHelper('prettyDate', function(created_at) {
        return $.timeago(created_at);
    });
  }

});
