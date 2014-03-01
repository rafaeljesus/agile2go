App.Views.RowItem = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView,
  _.extend({}, App.Mixins.Modal, {
  initialize: function(options){
    _.bindAll(this, 'render');
    this.template = options.template;
  },

  tagName: 'tr',

  template: JST['projects/item'],

  serializeData: function(){
    return this.model.toJSON();
  }

})));
