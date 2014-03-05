App.Views.TaskForm = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render', 'saved', 'setValue');
    this.model = options.model || this.newModel();
    this.sprints = options.sprints;
    this.bindTo(this.sprints, 'add', this.render);
    this.bindTo(this.model.sprint.project.assignedUsers, 'add', this.render);
    this.observe();
    new App.HandlebarsHelpers.withDiffDate();
  },

  template: JST['tasks/form'],

  serializeData: function(){
    return {
      model: this.model.toJSON(),
      sprints: this.sprints.toJSON(),
      users: this.model.projectUsers().toJSON()
    };
  },

  events: {
    'click .submit': 'save'
  },

  onRender: function(){
    this.renderAssignedSprint();
    this.renderAssignedUsers();
    this.thirdComponents();
    return this;
  },

  newModel: function(){
    var model = new App.Models.Task({});
    model.projectUsers().fetch({});
    return model;
  },

  renderAssignedSprint: function(){
    this.$('#sprint').val(this.model.sprint.id).trigger('change');
  },

  renderAssignedUsers: function(){
    this.$('#users').val(this.model.assignedUsers.ids());
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    if(this.model.isValid()){ this.model.save({}, { success: this.saved }); }
    return false;
  },

  commit: function(){
    var status = this.$('#status').val()
    , priority = this.$('#priority').val()
    , points   = this.$('#points').val()
    , title    = this.$('#title').val()
    , story    = this.$('#story').val();
    this.model.set({ status: status, priority: priority, points: points, title: title, story: story });
    this.model.sprint = this.sprints.get({ id: this.selectedSprint() });
    this.model.assignedUsers = this.model.findProjectUsersByIds(this.assignedUsersIds());
  },

  selectedSprint: function(){
    return _.first(this.$('#sprint').find('option:selected').map(this.setValue));
  },

  assignedUsersIds : function(){
    return this.$('#users').find('option:selected').map(this.setValue);
  },

  setValue: function(n, select){
    return $(select).val();
  },

  saved: function(model, response, options) {
     window.location.hash = '#tasks';
     var message = I18n.t('flash.actions.create.notice', { model: 'Task' });
     this.successMessage(message);
  },

  thirdComponents: function(){
    this.$('#sprint').select2();
    this.$('#users').select2();
    this.$('.ui.dropdown').dropdown();
  }

})));
