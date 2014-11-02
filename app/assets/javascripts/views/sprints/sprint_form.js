App.Views.SprintForm = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {

  template: JST['sprints/form'],

  initialize: function(options) {
    _.bindAll(this, 'render', 'saved');
    this.model = options.model || this.newModel();
    this.projects = options.projects;
    this.bindTo(this.projects, 'add', this.render);
    this.observe();
  },

  serializeData: function() {
    return {
      model: this.model.toJSON(),
      projects: this.projects.toJSON()
    }
  },

  events: {
    'click .submit': 'save'
  },

  onRender: function() {
    this.renderAssignedProject();
    this.select2();
    return this;
  },

  renderAssignedProject: function() {
    this.$('select').val(this.model.project.id).trigger('change');
  },

  save: function(e) {
    e.preventDefault();
    this.commit();
    this.model.save({}, { success: this.saved });
    return false;
  },

  commit: function() {
    var form = new App.Views.SprintSerialize(this);
    this.model.set(form.toAttributes());
    this.model.project = this.projects.get({ id: form.assigneeId() });
  },

    saved: function(model, response, options) {
     this.sprintsPath();
     var message = I18n.t('flash.actions.create.notice', { model: 'Sprint' });
     this.successMessage(message);
  },

  newModel: function() {
    return new App.Models.Sprint();
  },

  sprintsPath: function() {
    window.location.hash = '#sprints';
  },

  select2: function() {
    this.$('select').select2({ placeholder: 'Select a Project' });
  }

})));
