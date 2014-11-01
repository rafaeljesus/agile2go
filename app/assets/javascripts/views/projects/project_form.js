App.Views.ProjectForm = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {

  template: JST['projects/form'],

  initialize: function(options) {
    _.bindAll(this, 'render', 'saved');
    this.users = options.users;
    this.model = this.getModel(options);
    this.bindTo(this.users, 'add', this.render);
    this.observe();
  },

  serializeData: function() {
    return {
      model: this.model.toJSON(),
      users: this.users.toJSON()
    };
  },

  events: {
    'click .submit': 'save'
  },

  onRender: function() {
    this.renderUsers();
    this.select2();
    return this;
  },

  renderUsers: function() {
    var userIds = this.model.users.toIds();
    this.$('select').val(userIds);
  },

  save: function(e) {
    e.preventDefault();
    this.commit();
    this.model.save({}, { success: this.saved });
    return false;
  },

  commit: function() {
    this.model.set(this.toAttributes());
    this.model.users = this.users.findByIds(this.toUsersIds());
  },

  toAttributes: function() {
    return {
      name: this.$('#name').val(),
      description: this.$('#description').val(),
      company: this.$('#company').val()
    };
  },

  toUsersIds: function() {
    var selectedUsers = this.$('select').find('option:selected');
    return selectedUsers.map(function(n, select) {
      return $(select).val();
    });
  },

  saved: function(model, response, options) {
     this.projectsPath();
     var message = I18n.t('flash.actions.update.notice', { model: 'Project' });
     this.successMessage(message);
  },

  getModel: function(options) {
    return options.model || new App.Models.Project();
  },

  select2: function() {
    this.$('select').select2({ placeholder: 'Select a User' });
  },

  projectsPath: function() {
    window.location.href = '#projects';
  }

})));
