App.Models.Sprint = Backbone.Model.extend({
  urlRoot: '/sprints',

  initialize: function() {
    this.on('change:project', this.parseProject);
    this.parseProject();
  },

  parseProject: function() {
    var projectAttr = this.get('project');
    this.project = new App.Models.Project(projectAttr);
  },

  toJSON: function() {
    var json = _.clone(this.attributes);
    json.project_id = (this.project || {}).id || undefined;
    return json;
  },

  parse: function(model) {
    if (!model) return;
    model.start_date = moment(model.start_date).format('DD/MM/YYYY');
    model.end_date = moment(model.end_date).format('DD/MM/YYYY');
    return model;
  },

  validate: function(attrs, options) {
    var errors;
    if (!attrs.name) {
      (errors = errors || {}).name = ["can't be blank"];
    };
    if (!attrs.start_date || !moment(attrs.start_date).isValid()) {
      (errors = errors || {}).start_date = ["can't be blank"];
    };
    if (!attrs.end_date || !moment(attrs.end_date).isValid()) {
      (errors = errors || {}).end_date = ["can't be blank"];
    };
    if (attrs.daily && moment.duration(attrs.daily).hours() <= 0) {
      (errors = errors || {}).daily = ["invalid hour"];
    };
    if (isNaN(attrs.points)) {
      (errors = errors || {}).points = ["must be a number"];
    };
    if (errors) return errors;
  }

});
