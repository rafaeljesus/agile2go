App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render', 'deleted');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
    this.addPrettyDateHelper();
  },

  events: {
    'click .confirm' : 'showModal',
    'click .delete' : 'delete',
  },

  render: function(){
    this.$el.html(JST['projects/index'](this.collection.toJSON()));
    return this;
  },

  delete: function(e){
    e.preventDefault();
    this.model.destroy({ success: this.deleted() });
    return false;
  },

  showModal: function(e){
    e.preventDefault();
    var $i = $(e.target),
        id = $i.closest('a').attr('id');
    this.$tr = $i.closest('tr');
    this.model = this.collection.get({ id: id });
    new App.Views.ConfirmModal({ project: this.model }).render();
  },

  deleted: function(){
    this.$tr.remove();
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
