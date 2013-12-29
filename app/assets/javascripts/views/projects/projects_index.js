App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize : function(){
   _.bindAll(this, 'render');
   this.addPrettyDateHelper();
  },

  events : {
    'click .remove' : 'remove',
  },

  render : function(){
    var self = this;
    self.collection.fetch().done(function(data){
      self.$el.html(JST['projects/index'](data));
    });
    return this;
  },

  remove : function(el){
    var $i = $(el.target),
        id = $i.closest('a').attr('id');
    $i.closest('tr').remove();
    var model = this.collection.get({ id: id });
    model.destroy().done(function(response){
      console.log('successfully deleted');
    });
  },

  addPrettyDateHelper : function() {
    Handlebars.registerHelper('prettyDate', function(created_at) {
        return $.timeago(created_at);
    });
  }

});
