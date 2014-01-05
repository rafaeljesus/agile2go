App.Models.User = Backbone.RelationalModel.extend({
  urlRoot: '/users',
  // idAttribute: '_id',

  relations: [{
    type: Backbone.HasOne,
    key: 'project',
    relatedModel: 'App.Models.Project'
  }]

});
