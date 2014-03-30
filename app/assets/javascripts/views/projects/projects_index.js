App.Views.ProjectsIndex = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render', 'renderRow');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
    new App.HandlebarsHelpers().withTimeago().withDiffDate().withTruncate();
    this.tablePartial();
  },

  template: JST['projects/index'],

  partial: JST['projects/table'],

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
  },

  tablePartial: function(){
    Handlebars.registerPartial('project_table', this.partial);
  }

});
