App.Views.TasksIndex = Support.CompositeView.extend({

  template: JST['tasks/index'],
  itemTemplate: JST['tasks/item'],

  initialize: function(options) {
    _.bindAll(this, 'render', 'renderItem');
    this.bindTo(this.collection, 'add remove', this.render);
    this.registerHelpers();
  },

  render: function() {
    this.$el.html(this.template());
    this.$('#items').empty();
    this.collection.each(this.renderItem);
    return this;
  },

  renderItem: function(model) {
    var item = new App.Views.CollectionItem(this.itemData(model));
    this.renderChild(item);
    this.$('#items').append(item.el);
  },

  itemData: function(model) {
    return {
      model: model,
      collection: this.collection,
      template: this.itemTemplate,
      tagName: 'div',
      className: 'column removable'
    }
  },

  registerHelpers: function() {
    new App.HandlebarsHelpers()
      .withDiffDate()
      .withTimeago()
      .withTruncate();
  }

});
