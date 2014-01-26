App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
    this.addPrettyDateHelper();
  },

  events: {
    'click .confirm' : 'showModal',
    'click .delete' : 'delete'
  },

  render: function(){
    this.$el.html(JST['projects/index'](this.collection.toJSON()));
    return this;
  },

  showModal: function(e){
    e.preventDefault();
    var $i = $(e.target),
        id = $i.closest('a').attr('id');
    this.model = this.collection.get({ id: id });
    new App.Views.ConfirmModal({ project: this.model, $tr: $i.closest('tr') }).render();
  },

  addPrettyDateHelper: function() {
    Handlebars.registerHelper('prettyDate', function(created_at) {
      if (!created_at) return;
        return $.timeago(created_at);
    });
  }

});
