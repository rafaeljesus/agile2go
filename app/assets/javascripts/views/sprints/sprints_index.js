App.Views.SprintsIndex = Support.CompositeView.extend({

  template: JST['sprints/index'],
  itemTemplate: JST['sprints/item'],
  partial: JST['sprints/table'],

  initialize: function() {
    _.bindAll(this, 'render', 'renderRow');
    this.bindTo(this.collection, 'change add reset', this.render);
    this.registerHelpers();
    this.tablePartial();
  },

  render: function() {
    this.$el.html(this.template());
    this.$('tbody').empty();
    this.collection.each(this.renderRow);
    return this;
  },

  renderRow: function(model) {
    var options = {
      model: model,
      template: this.itemTemplate,
      tagName: 'tr'
    };
    var row = new App.Views.CollectionItem(options);
    this.renderChild(row);
    this.$('tbody').append(row.el);
  },

  registerHelpers: function() {
    new App.HandlebarsHelpers()
      .withTimeago()
      .withDiffDate();
  },

  tablePartial: function() {
    Handlebars.registerPartial('sprint_table', this.partial);
  }

});
