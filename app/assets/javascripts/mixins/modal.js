App.Mixins.Modal = {

  events: {
    'click .confirm' : 'showModal',
    'click .delete' : 'delete'
  },

  showModal: function(e){
    e.preventDefault();
    var $i = $(e.target);
    var id = $i.closest('a').attr('id');
    new App.Views.ConfirmModal({ model: this.model, $tr: $i.closest('tr') }).render();
  }

};
