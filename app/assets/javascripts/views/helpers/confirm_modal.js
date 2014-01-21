App.Views.ConfirmModal = Backbone.View.extend({
  el: '.ui.small.modal',

  initialize: function(options){
    _.bindAll(this, 'render');
    this.project = options.project;
  },

  render: function(){
    this.$el.html(JST['modal']({ name: this.project.get('name'), id: this.project.get('id') }));
    this.show();
    return this;
  },

  show: function(){
    this.$el.modal('show');
  }

});
