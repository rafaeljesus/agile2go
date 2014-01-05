App.Models.Project = Backbone.RelationalModel.extend({
  urlRoot: '/projects',
  // idAttribute: '_id',

  relations: [{
    type: Backbone.HasMany,
    key: 'users',
    relatedModel: 'App.Models.User',
    // includeInJSON: Backbone.Model.prototype.idAttribute,
    collectionType: 'App.Collections.Users'
  }]

});
