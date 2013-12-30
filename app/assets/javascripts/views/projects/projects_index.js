App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize: function(){
   _.bindAll(this, 'render');
   this.addPrettyDateHelper();
  },

  events: {
    'click .remove' : 'remove',
  },

  render: function(){
    this.$el.html(JST['projects/index'](this.collection));
    return this;
  },

  remove: function(el){
    var $i = $(el.target),
        id = $i.closest('a').attr('id'),
        self = this;
    $i.closest('tr').remove();
    var model = self.collection.get({ id: id });
    model.destroy().done(function(){
      self.deleted();
    });
  },

  deleted: function(){
     var text = 'Project was successfully deleted';
     $('#messages')
       .show()
       .html(JST['messages']({ type : 'Success', color : 'blue', text : text }))
       .fadeOut(4000);
  },

  addPrettyDateHelper: function() {
    Handlebars.registerHelper('prettyDate', function(created_at) {
        return $.timeago(created_at);
    });
  }

});
