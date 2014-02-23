App.Views.SprintsIndex = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render', 'renderRow');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
  },

  template: JST['sprints/index'],

  render: function(){
    this.$el.html(this.template());
    this.$('tbody').empty();
    this.collection.each(this.renderRow);
    return this;
  },

  renderRow: function(model){
    var row = new App.Views.SprintItem({ model: model });
    this.renderChild(row);
    this.$('tbody').append(row.el);
  }

});
