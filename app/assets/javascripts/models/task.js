App.Models.Task = Backbone.Model.extend({
  url: '/tasks',

  initialize: function() {
    this.setSprint();
    this.setUsers();
  },

  setSprint: function() {
    var sprintAttr = { id: this.get('sprint_id') }
    this.sprint = new App.Models.Sprint(sprintAttr);
  },

  setUsers: function() {
    var userIds = this.get('user_ids') || [];
    var ids = userIds.map(function(id) {
      return { id: id }
    });
    this.users = new App.Collections.Users(ids);
  },

  findUsers: function() {
    var users = this.sprint.project.users;
    users.fetch();
    return users;
  },

  toUserIds: function() {
    return this.users.map(function(user) {
      return user.id;
    });
  },

  toJSON: function() {
    var json = _.clone(this.attributes);
    json.sprint_id = (this.sprint || {}).id || null;
    json.user_ids = this.toUserIds();
    return json;
  },

  save: function(callback) {
    var json = { task: this.toJSON() }
    $.ajax({
      type: this.isNew() ? 'POST' : 'PUT',
      data: json,
      url: this.url + '/' + (this.isNew() ? '' : json.task.id)
    }).done(function(res) {
      var model = res ? res.task : json.task;
      callback(model);
    });
  },

  validate: function(attrs, options) {
    var errors;
    if (!attrs.title) {
      (errors = errors || {}).title = ["can't be blank"];
    }
    if (!attrs.story) {
      (errors = errors || {}).story = ["can't be blank"];
    }
    if (errors) return errors;
  }

});
