App.Models.Project = Backbone.RelationalModel.extend({
  urlRoot: '/projects',

  relations: [{
    type: Backbone.HasMany,
    key: 'users',
    relatedModel: 'App.Models.User',
    reverseRelation: {
      key: 'project'
    }
  }]
});
