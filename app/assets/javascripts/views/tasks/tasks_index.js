App.Views.TasksIndex = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'renderItem', 'showSyncMessage');
    this.bindTo(this.collection, 'change', this.change);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
    new App.HandlebarsHelpers().withDiffDate().withTimeago().withTruncate();
  },

  template: JST['tasks/index'],

  render: function(){
    this.$el.html(this.template());
    this.$('#items').empty();
    this.collection.each(this.renderItem);
    return this;
  },

  change: function(){
    if(window.location.hash != '#tasks') return;
    this.collection.each(this.showSyncMessage);
    this.render();
  },

  renderItem: function(model){
    var dependencies = { model: model, template: JST['tasks/item'], tagName: 'div', className: 'column removable' };
    var item = new App.Views.CollectionItem(dependencies);
    this.renderChild(item);
    this.$('#items').append(item.el);
  },

  showSyncMessage: function(model){
    if($.isEmptyObject(model.changed)) return;
    var message = "'" + model.get('title') + "' has a new version";
    new FlashMessages({ message: message }).info();
    return false;
  }

});
