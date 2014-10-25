App.Views.CollectionItem = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView,
  _.extend({}, App.Mixins.Modal, {

  className: 'removable',

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.template = options.template;
  },

  serializeData: function() {
    return this.model.toJSON();
  }

})));
