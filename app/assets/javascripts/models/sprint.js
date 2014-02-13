App.Models.Sprint = Backbone.Model.extend({
  urlRoot: '/sprints',

  initialize: function(){
    this.observe();
    this.parseProject();
  },

  observe: function(){
    this.on('change:project', this.parseProject);
  },

  parseProject: function(){
    var projectAttr = this.get('project');
    this.project = new App.Models.Project(projectAttr);
  },

  parseTasks: function(){
  }

});
