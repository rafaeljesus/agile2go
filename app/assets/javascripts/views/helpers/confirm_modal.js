App.Views.ConfirmModal = Backbone.View.extend({
  id: '#modal',
  className: 'ui small modal',
  tagName: 'div',

  initialize: function(options){
    _.bindAll(this, 'render', 'deleted');
    this.model = options.model;
    this.$tr = options.$tr;
  },

  events: {
    'click .delete': 'delete'
  },

  render: function(){
    this.$el.html(JST['modal']({ name: this.model.get('name'), id: this.model.get('id') }));
    this.show();
    return this;
  },

  delete: function(e){
    e.preventDefault();
    this.model.destroy({ success: this.deleted() });
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
