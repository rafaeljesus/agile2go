App.Views.ProjectForm = Support.CompositeView.extend(
  _.extend({}, App.Mixins.ModelObserver,
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render', 'saved'),
    this.users = options.users;
    this.model = options.model || new App.Models.Project({});
    this.bindTo(this.users, 'add', this.render);
    this.observe();
  },

  template: JST['projects/form'],

  serializeData: function(){
    return { model: this.model.toJSON(), users: this.users.toJSON() };
  },

  events: {
    'click .submit': 'save'
  },

  onRender: function(){
    this.renderAssignedUsers();
    this.select2();
    return this;
  },

  renderAssignedUsers: function(){
    this.$('select').val(this.model.assignedUsers.ids());
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    if(this.model.isValid()){ this.model.save({}, { success: this.saved }); }
    return false;
  },

  commit: function(){
    var name = this.$('#name').val()
    , description = this.$('#description').val()
    , company = this.$('#company').val();
    this.model.set({ name: name, description: description, company: company });
    this.model.assignedUsers = this.users.findByIds(this.assigneeIds());
  },

  assigneeIds: function(){
    return this.$('select').find('option:selected').map(function(n, select){
      return $(select).val();
    });
  },

  saved: function(model, response, options) {
     this.projectsPath();
     var message = I18n.t('flash.actions.update.notice', { model: 'Project' });
     this.successMessage(message);
  },

  select2: function(){
    this.$('select').select2({ placeholder: 'Select a User' });
  },

  projectsPath: function(){
    window.location.href = '#projects';
  }

})));
