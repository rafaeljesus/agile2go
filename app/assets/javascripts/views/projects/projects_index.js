App.Views.ProjectsIndex = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView,
  _.extend({}, App.Mixins.Modal, {
  initialize: function(){
    _.bindAll(this, 'render');
    this.bindTo(this.collection, 'change', this.render);
    this.bindTo(this.collection, 'reset', this.render);
    this.bindTo(this.collection, 'add', this.render);
    this.addPrettyDateHelper();
  },

  template: JST['projects/index'],

  serializeData: function(){
    return this.collection.toJSON();
  }

})));
