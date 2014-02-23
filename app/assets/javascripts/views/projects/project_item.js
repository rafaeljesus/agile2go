App.Views.ProjecItem = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView,
  _.extend({}, App.Mixins.Modal, {
  initialize: function(){
    _.bindAll(this, 'render');
    this.addPrettyDateHelper();
  },

  id: function(){
    return 'project-item-' + this.model.id;
  },

  tagName: 'tr',

  template: JST['projects/item'],

  serializeData: function(){
    return this.model.toJSON();
  }

})));
