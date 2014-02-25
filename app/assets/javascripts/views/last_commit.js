App.Views.LastCommit = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render');
    this.collection.fetch({});
    this.bindTo(this.collection, 'add', this.render);
  },

  template: JST['last_commit'],

  serializeData: function(){
    var model = _.first(this.collection.toJSON());
    return { sha: model.sha, html_url: model.html_url };
  },

  render: function(){
    $('#last-commit').html(this.template(this.serializeData()));
    return this;
  }

});
