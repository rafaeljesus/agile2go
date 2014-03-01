App.Views.SprintForm = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render', 'saved');
    this.model = options.model || new App.Models.Sprint({});
    this.projects = options.projects;
    this.bindTo(this.projects, 'add', this.render);
    this.observe();
  },

  template: JST['sprints/form'],

  serializeData: function(){
    return { model: this.model.toJSON(), projects: this.projects.toJSON() };
  },

  events: {
    'click .submit': 'save',
    'keyup #start-date': 'isValidStartDate',
    'keyup #end-date': 'isValidEndDate'
  },

  onRender: function(){
    this.renderAssignedProject();
    this.select2();
    return this;
  },

  renderAssignedProject: function(){
    this.$('select').val(this.model.project.id).trigger('change');
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    if(this.model.isValid()){ this.model.save({}, { success: this.saved }); };
    return false;
  },

  isValidStartDate: function(e){
    e.preventDefault();
    var $input = e.target.value;
  },

  isValidEndDate: function(e){
    e.preventDefault();
    var $input = e.target.value;
  },

  commit: function(){
    var start_date = this.$('#start-date').val()
    , end_date   = this.$('#end-date').val();
    if(start_date != '') { start_date = moment(start_date).format('MM/DD/YYYY'); };
    if(end_date != '') { end_date = moment(end_date).format('MM/DD/YYYY'); };
    var name = this.$('#name').val()
    , daily  = this.$('#daily').val()
    , points = this.$('#points').val();
    this.model.set({ name: name, start_date: start_date, end_date: end_date, daily: daily, points: points });
    this.model.project = this.projects.get({ id: this.assigneeId() });
  },

  assigneeId: function(){
    return _.first(this.$('select').find('option:selected').map(function(n, select){
      return $(select).val();
    }));
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

})));
