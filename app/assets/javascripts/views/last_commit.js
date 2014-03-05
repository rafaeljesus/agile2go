App.Views.LastCommit = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView, {
  id: '#last-commit',
  tagName: 'div',
  className: 'ui one column middle aligned page grid sign-up',

  initialize: function(){
    _.bindAll(this, 'render');
    this.newCollection();
    this.bindTo(this.collection, 'add', this.render);
    new App.HandlebarsHelpers.withTimeago();
  },

  template: JST['last_commit'],

  serializeData: function(){
    var model = _.first(this.collection.toJSON());
    if($.isEmptyObject(model)) return model;
    return { committer: model.commit.committer, sha: model.sha.substring(0, 10), html_url: model.html_url };
  },

  newCollection: function(){
    this.collection = new App.Collections.LastCommits({});
    this.collection.fetch({});
  }

}));
