App.Models.Task = Backbone.Model.extend({
  urlRoot: '/tasks',

  initialize: function() {
    this.on('change:sprint', this.parseSprint);
    this.on('change:assignedUsers', this.parseUsers);
    this.parseSprint();
    this.parseUsers();
  },

  parseSprint: function() {
    var sprintAttr = this.get('sprint');
    this.sprint = new App.Models.Sprint(sprintAttr);
  },

  parseUsers: function() {
    var assignedAttr = this.get('users');
    this.assignedUsers = new App.Collections.Users(assignedAttr);
  },

  allUsers: function() {
    var users = this.sprint.project.users;
    users.fetch();
    return users;
  },

  user_assignments_attributes: function() {
    return this.assignedUsers.map(function(user) {
      return { user_id: user.id }
    });
  },

  toJSON: function() {
    var json = _.clone(this.attributes);
    json.sprint_id = (this.sprint || {}).id || {};
    json.user_assignments_attributes = this.user_assignments_attributes();
    return json;
  },

  validate: function(attrs, options) {
    var errors;
    if (!attrs.title) {
      (errors = errors || {}).title = ["can't be blank"];
    };
    if (!attrs.story) {
      (errors = errors || {}).story = ["can't be blank"];
    };
    if (errors) return errors;
  }

});
