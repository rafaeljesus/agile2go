App.Views.SprintForm = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render', 'saved');
    this.model = options.model || new App.Models.Sprint({});
    this.projects = options.projects;
    this.bindTo(this.projects, 'add', this.render);
    this.observe();
  },

  template: JST['sprints/form'],

  events: {
    'click .submit': 'save'
  },

  render: function(){
    this.renderTemplate()
    this.renderAssignedProject();
    this.select2();
    return this;
  },

  renderTemplate: function(){
    this.$el.html(this.template(this.serializeData()));
  },

  serializeData: function(){
    return { model: this.model.toJSON(), projects: this.projects.toJSON() };
  },

  renderAssignedProject: function(){
    this.$('select').val(this.model.project.id).trigger('change');
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    if(!this.model.isValid()) return;
    this.model.save({}, { success: this.saved });
    return false;
  },

  commit: function(){
    var name = this.$('#name').val()
    , start_date = this.$('#start-date').val()
    , end_date = this.$('#end-date').val()
    , daily = this.$('#daily').val()
    , points = this.$('#points').val();
    this.model.set({ name: name, start_date: start_date, end_date: end_date, daily: daily, points: points });
    this.model.project = this.assignedProject();
  },

  assignedProject: function(){
    var self = this;
    return _.first(_.map(this.assigneeId(), function(id){
      return self.projects.get({ id: id });
    }));
  },

  assigneeId: function(){
    return this.$('select').find('option:selected').map(function(n, select){
      return $(select).val();
    });
  },

  saved: function(model, response, options) {
     this.sprintsPath();
     var message = I18n.t('flash.actions.create.notice', { model: 'Sprint' });
     this.successMessage(message);
  },

  sprintsPath: function(){
    window.location.hash = '#sprints';
  },

  select2: function(){
    this.$('select').select2({ placeholder: 'Select a Project' });
  }

}));
