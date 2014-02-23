App.Mixins.Modal = {
  showModal: function(e){
    e.preventDefault();
    var $i = $(e.target);
    var id = $i.closest('a').attr('id');
    this.model = this.collection.get({ id: id });
    new App.Views.ConfirmModal({ model: this.model, $tr: $i.closest('tr') }).render();
  }

};
