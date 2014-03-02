App.Models.Task = Backbone.Model.extend({
  urlRoot: '/tasks',

  initialize: function(){
    this.on('change:sprint', this.parseSprint);
    this.parseSprint();
  },

  parseSprint: function(){
    var sprintAttr = this.get('sprint');
    this.sprint = new App.Models.Sprint(sprintAttr);
  },

  toJSON: function(){
    var json = _.clone(this.attributes);
    json.sprint_id = this.sprint.id;
    return json;
  }

});
