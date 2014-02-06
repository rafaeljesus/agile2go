App.Models.Project = Backbone.Model.extend({
  urlRoot: '/projects',

  initialize: function(){
    this.on('change:assignedUsers', this.parseUsers);
    this.parseUsers();
  },

  parseUsers: function(){
    var assignedAttr = this.get('assignedUsers');
    this.assignedUsers = new App.Collections.Users(assignedAttr);
  },

  assignments_attributes: function(){
    return this.assignedUsers.map(function(user) { return { user_id: user.id } });
  },

  toJSON: function() {
    var json = _.clone(this.attributes);
    json.assignments_attributes = this.assignments_attributes();
    return json;
  },

  validate: function(attrs, options){
    if(!attrs.name){ return "name can't be blank" };
    if(!attrs.company){ return "company can't be blank" };
    if(!attrs.description){ return "description can't be blank" };
  }

});
