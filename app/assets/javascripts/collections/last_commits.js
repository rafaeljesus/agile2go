var App.Collections.LastCommits = Backbone.Collection.extend({
  url: 'https://api.github.com/repos/rafaeljesus/agile2go/commits',
  model: App.Models.LastCommit,

  parse: function(response){
    return _.first(response);
  }
});
