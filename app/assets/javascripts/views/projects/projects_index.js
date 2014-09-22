App.Views.ProjectsIndex = Support.CompositeView.extend({

  template: JST['projects/index'],
  itemTemplate: JST['projects/item'],

  initialize: function() {
    _.bindAll(this, 'render', 'renderRow');
    this.bindTo(this.collection, 'change add reset', this.render);
    this.registerHelpers();
  },

  render: function() {
    this.$el.html(this.template());
    this.$('#index').empty();
    this.collection.each(this.renderRow);
    return this;
  },

  renderRow: function(model) {
    var options = { model: model, template: this.itemTemplate };
    var row = new App.Views.CollectionItem(options);
    this.renderChild(row);
    this.$('#index').append(row.el);
  },

  registerHelpers: function() {
    new App.HandlebarsHelpers()
      .withTimeago()
      .withDiffDate()
      .withTruncate();
  }

});
