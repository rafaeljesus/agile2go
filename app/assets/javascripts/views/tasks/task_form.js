App.Views.TaskForm = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {

  template: JST['tasks/form'],

  initialize: function(options) {
    _.bindAll(this, 'render', 'saved');
    this.model = this.getModel(options);
    this.collection = options.collection;
    this.sprints = options.sprints;
    this.users = options.users;
    this.bindTo(this.sprints, 'add', this.render);
    this.bindTo(this.users, 'add', this.render);
    this.observe();
    this.registerHelpers();
  },

  serializeData: function() {
    return {
      model: this.model.toJSON(),
      sprints: this.sprints.toJSON(),
      users: this.users.toJSON()
    };
  },

  events: {
    'click .submit': 'save'
  },

  onRender: function() {
    this.renderSprint();
    this.renderUsers();
    this.thirdComponents();
    return this;
  },

  renderSprint: function() {
    this.$('#sprint').val(this.model.sprint.id).trigger('change');
  },

  renderUsers: function() {
    var userIds = this.model.users.toIds();
    this.$('#users').val(userIds);
  },

  save: function(e) {
    e.preventDefault();
    this.commit();
    this.model.save(this.saved);
    return false;
  },

  commit: function() {
    this.model.set(this.toAttributes());
    this.model.sprint = this.sprints.get({ id: this.toSprintId() });
    this.model.users = this.users.findByIds(this.toUsersIds());
  },

  toAttributes: function() {
    return {
      status: this.$('#status').val(),
      priority: this.$('#priority').val(),
      points: this.$('#points').val(),
      title: this.$('#title').val(),
      story: this.$('#story').val()
    }
  },

  toSprintId: function() {
    var selectedSprint = this.$('#sprint').find('option:selected');
    return _.first(selectedSprint.map(this.setOptionValue));
  },

  toUsersIds: function() {
    var selectedUsers = this.$('#users').find('option:selected');
    return selectedUsers.map(this.setOptionValue);
  },

  setOptionValue: function(n, select) {
    return $(select).val();
  },

  saved: function(model) {
    this.collection.add(model);
    window.location.hash = '#tasks';
    var message = I18n.t('flash.actions.create.notice', { model: 'Task' });
    this.successMessage(message);
  },

  getModel: function(options) {
    return options.model || new App.Models.Task();
  },

  registerHelpers: function() {
    new App.HandlebarsHelpers().withDiffDate();
  },

  thirdComponents: function() {
    this.$('#sprint').select2();
    this.$('#users').select2();
    this.$('.ui.dropdown').dropdown();
  }

})));
