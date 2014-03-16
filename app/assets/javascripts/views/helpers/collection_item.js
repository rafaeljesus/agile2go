App.Views.CollectionItem = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView,
  _.extend({}, App.Mixins.Modal, {
  initialize: function(options){
    _.bindAll(this, 'render');
    this.template = options.template;
  },

  className: 'removable',

  serializeData: function(){
    return this.model.toJSON();
  }

})));
