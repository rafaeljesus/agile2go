App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render', 'renderRow');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
  },

  template: JST['projects/index'],

  render: function(){
    this.$el.html(this.template());
    this.$('tbody').empty();
    this.collection.each(this.renderRow);
    return this;
  },

  renderRow: function(model){
    var row = new App.Views.ProjecItem({ model: model });
    this.renderChild(row);
    this.$('tbody').append(row.el);
  }

});
