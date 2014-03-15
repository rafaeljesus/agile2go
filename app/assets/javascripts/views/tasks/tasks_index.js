App.Views.TasksIndex = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'renderItem');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
    new App.HandlebarsHelpers().withDiffDate().withTimeago().withTruncate();
    this.activeMenu();
  },

  template: JST['tasks/index'],

  render: function(){
    this.$el.html(this.template());
    this.$('#items').empty();
    this.collection.each(this.renderItem);
    return this;
  },

  renderItem: function(model){
    var dependencies = { model: model, template: JST['tasks/item'], tagName: 'div', className: 'column removable' };
    var item = new App.Views.CollectionItem(dependencies);
    this.renderChild(item);
    this.$('#items').append(item.el);
  },

  activeMenu: function(){
    $("a[href='#']").removeClass('active');
    $("a[href='#projects']").removeClass('active');
    $("a[href='#sprints']").removeClass('active');
    $("a[href='#tasks']").addClass('active');
  }

});
