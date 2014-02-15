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
  },

  toJSON: function(){
    var json = _.clone(this.attributes);
    json.project_id = this.project.id ;
    return json;
  },

  validate: function(attrs, options){
    if(!attrs.start_date){ return "start date can't be blank" };
    if(!attrs.end_date){ return "end date can't be blank" };
    if(!this.project.attributes.name){ return "project can't be blank" };
  }

});
