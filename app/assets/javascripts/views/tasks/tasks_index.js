App.Views.TasksIndex = Support.CompositeView.extend(
  _.extend({}, App.Mixins.HandlebarsHelpers, {
  initialize: function(options){
    _.bindAll(this, 'render', 'renderItem');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
    this.timeagoHelper();
    this.diffDateHelper();
  },

  template: JST['tasks/index'],

  render: function(){
    this.$el.html(this.template());
    this.$('#items').empty();
    this.collection.each(this.renderItem);
    return this;
  },

  renderItem: function(model){
    var dependencies = { model: model, template: JST['tasks/item'], tagName: 'div', className: 'column' };
    var item = new App.Views.CollectionItem(dependencies);
    this.renderChild(item);
    this.$('#items').append(item.el);
  }

}));
