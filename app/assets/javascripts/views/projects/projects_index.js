App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render', 'deleted');
    this.bindTo(this.collection, 'add', this.render);
    this.addPrettyDateHelper();
  },

  events: {
    'click .remove' : 'delete',
  },

  render: function(){
    this.$el.html(JST['projects/index'](this.collection.toJSON()));
    return this;
  },

  delete: function(e){
    e.preventDefault();
    var $i = $(e.target),
        id = $i.closest('a').attr('id');
    $i.closest('tr').remove();
    this.model = this.collection.get({ id: id });
    this.model.destroy({ success: this.deleted() });
    return false;
  },

  deleted: function(){
    var message = 'Project was successfully deleted';
    new FlashMessages({ message: message }).success();
  },

  addPrettyDateHelper: function() {
    Handlebars.registerHelper('prettyDate', function(created_at) {
      if (created_at == undefined) return;
        return $.timeago(created_at);
    });
  }

});
