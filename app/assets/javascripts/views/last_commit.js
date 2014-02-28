App.Views.LastCommit = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView, {
  id: '#last-commit',
  tagName: 'div',
  className: 'ui one column middle aligned page grid sign-up',

  initialize: function(){
    _.bindAll(this, 'render');
    this.newCollection();
    this.bindTo(this.collection, 'add', this.render);
  },

  template: JST['last_commit'],

  serializeData: function(){
    var model = _.first(this.collection.toJSON());
    return { sha: model.sha, html_url: model.html_url };
  },

  newCollection: function(){
    this.collection = new App.Collections.LastCommits({});
    this.collection.fetch({});
  }

}));
