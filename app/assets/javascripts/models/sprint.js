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

  parse: function(model){
    if(!model) return;
    model.start_date = moment(model.start_date).calendar();
    model.end_date = moment(model.end_date).calendar();
    return model;
  },

  validate: function(attrs, options){
    var errors;
    if(!attrs.name){
       errors = errors || {};
       errors.name = ["can't be blank"];
    };
    if(!attrs.start_date){
       errors = errors || {};
       errors.start_date = ["can't be blank"];
    };
    if(!attrs.end_date){
      errors = errors || {};
      errors.end_date = ["can't be blank"];
    };
    if(errors) return errors;
  }

});
