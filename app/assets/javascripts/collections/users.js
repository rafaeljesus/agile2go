App.Collections.Users = Backbone.Collection.extend({
  url: '/users',
  model: App.Models.User,

  toIds: function() {
    return _.uniq(_.pluck(this.toJSON(), 'id'));
  },

  findByIds: function(assigneeIds) {
    var self = this;
    return _.uniq(_.compact(_.map(assigneeIds, function(id) {
      return self.get({ id: id });
    })));
  }

});
