App.Mixins.Modal = {

  events: {
    'click .confirm' : 'showModal',
    'click .delete' : 'delete'
  },

  showModal: function(e) {
    e.preventDefault();
    this.removable = $(e.target).closest('.removable');
    new App.Views.ConfirmModal(this.data()).render();
  },

  data: function() {
    return {
      model: this.model,
      collection: this.collection,
      $removable: this.removable
    }
  }

};
