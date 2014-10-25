App.Models.Project = Backbone.Model.extend({
  urlRoot: '/projects',

  initialize: function() {
    this.setUsers();
  },

  setUsers: function() {
    var userIds = this.get('user_ids') || [];
    var ids = userIds.map(function(id) {
      return { id: id }
    });
    this.users = new App.Collections.Users(ids);
  },

  toUserIds: function() {
    return this.users.map(function(user) {
      return user.id;
    });
  },

  toJSON: function() {
    var json = _.clone(this.attributes);
    json.user_ids = this.toUserIds();
    return json;
  },

  validate: function(attrs, options) {
    var errors;
    if (!attrs.name) {
      (errors = errors || {}).name = ["can't be blank"];
    }
    if (!attrs.company) {
      (errors = errors || {}).company= ["can't be blank"];
    }
    if (!attrs.description) {
      (errors = errors || {}).description= ["can't be blank"];
    }
    if (errors) return errors;
  }

});
