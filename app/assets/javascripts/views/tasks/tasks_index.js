App.Views.TasksIndex = Support.CompositeView.extend({

  template: JST['tasks/index'],
  itemTemplate: JST['tasks/item'],

  initialize: function(options) {
    _.bindAll(this, 'render', 'renderItem', 'showSyncMessage');
    // this.bindTo(this.collection, 'change reset add', this.change);
    this.bindTo(this.collection, 'change reset add', this.render);
    this.registerHelpers();
  },

  render: function() {
    this.$el.html(this.template());
    this.$('#items').empty();
    this.collection.each(this.renderItem);
    return this;
  },

  change: function() {
    if (window.location.hash != '#tasks') return;
    this.collection.each(this.showSyncMessage);
    this.render();
  },

  renderItem: function(model) {
    var options = {
      model: model,
      template: this.itemTemplate,
      tagName: 'div',
      className: 'column removable'
    };
    var item = new App.Views.CollectionItem(options);
    this.renderChild(item);
    this.$('#items').append(item.el);
  },

  registerHelpers: function() {
    new App.HandlebarsHelpers()
      .withDiffDate()
      .withTimeago()
      .withTruncate();
  },

  showSyncMessage: function(model) {
    if ($.isEmptyObject(model.changed)) return;
    var message = "'" + model.get('title') + "' has a new version";
    new FlashMessages({ message: message }).info();
    return false;
  }

});
