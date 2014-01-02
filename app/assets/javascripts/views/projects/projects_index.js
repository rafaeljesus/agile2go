App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize: function(){
   _.bindAll(this, 'render');
   this.addPrettyDateHelper();
  },

  events: {
    'click .remove' : 'delete',
  },

  render: function(){
    this.$el.append(JST['projects/index'](this.collection.toJSON()));
    return this;
  },

  delete: function(e){
    e.preventDefault();
    var $i = $(e.target),
        id = $i.closest('a').attr('id'),
        self = this,
        model;
    $i.closest('tr').remove();
    model = self.collection.get({ id: id });
    model.destroy().done(function(){
      self.deleted();
    });
  },

  deleted: function(){
     var message = 'Project was successfully deleted';
     new FlashMessages({ message: message }).success();
  },

  addPrettyDateHelper: function() {
    Handlebars.registerHelper('prettyDate', function(created_at) {
        return $.timeago(created_at);
    });
  }

});
