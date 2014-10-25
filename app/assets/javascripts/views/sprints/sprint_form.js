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
    var attributes = {
      name: this.$('#name').val(),
      start_date: this.parseStartDate(),
      end_date: this.parseEndDate(),
      daily: this.$('#daily').val(),
      points: this.$('#points').val()
    }
    this.model.set(attributes);
    this.model.project = this.projects.get({ id: this.assigneeId() });
  },

  parseStartDate: function() {
    var start_date = this.$('#start-date').val();
    if (start_date == '') return;
    return moment(start_date).format('YYYY-MM-DD');
  },

  parseEndDate: function() {
    var end_date = this.$('#end-date').val();
    if (end_date == '') return;
    return moment(end_date).format('YYYY-MM-DD');
  },

  assigneeId: function() {
    return _.first(this.$('select').find('option:selected').map(function(n, select) {
      return $(select).val();
    }));
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
