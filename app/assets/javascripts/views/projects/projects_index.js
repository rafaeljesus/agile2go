App.Views.ProjectsIndex = Support.CompositeView.extend(
  _.extend({}, App.Mixins.HandlebarsHelpers, {
  initialize: function(){
    _.bindAll(this, 'render', 'renderRow');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
    this.timeagoHelper();
    this.diffDateHelper();
    this.truncate();
  },

  template: JST['projects/index'],

  render: function(){
    this.$el.html(this.template());
    this.$('tbody').empty();
    this.collection.each(this.renderRow);
    return this;
  },

  renderRow: function(model){
    var row = new App.Views.CollectionItem({ model: model, template: JST['projects/item'], tagName: 'tr' });
    this.renderChild(row);
    this.$('tbody').append(row.el);
  }

}));
