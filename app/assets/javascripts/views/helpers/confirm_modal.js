App.Views.ConfirmModal = Backbone.View.extend({
  id: '#modal',
  className: 'ui small modal',
  tagName: 'div',

  initialize: function(options){
    _.bindAll(this, 'render', 'deleted');
    this.project = options.project;
    this.$tr = options.$tr;
  },

  events: {
    'click .delete': 'delete'
  },

  render: function(){
    this.$el.html(JST['modal']({ name: this.project.get('name'), id: this.project.get('id') }));
    this.show();
    return this;
  },

  delete: function(e){
    e.preventDefault();
    this.project.destroy({ success: this.deleted() });
    return false;
  },

  deleted: function(){
    this.$tr.remove();
    this.hide();
    var message = 'Project was successfully deleted';
    new FlashMessages({ message: message }).success();
  },

  show: function(){
    this.$el.modal('show');
  },

  hide: function(){
    this.$el.modal('hide');
  }

});
