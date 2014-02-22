App.Views.ProjectNew = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render', 'saved');
    this.users = options.users;
    this.newProject();
    this.bindTo(this.users, 'add', this.render);
    this.observe();
  },

  template: JST['projects/form'],

  events: {
    'click .submit': 'save'
  },

  render: function(){
    this.renderTemplate();
    this.select2();
    return this;
  },

  renderTemplate: function(){
    this.$el.html(this.template(this.serializeData()));
  },

  serializeData: function(){
    return { model: this.model.toJSON(), users: this.users.toJSON() };
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
    , description = this.$('#description').val()
    , company = this.$('#company').val();
    this.model.set({ name: name, description: description, company: company });
    this.model.assignedUsers = new App.Collections.Users(this.assignedUsers());
  },

  assignedUsers: function(){
    var self = this;
    return _.uniq(_.compact(_.map(this.assigneeIds(), function(id) {
      return self.users.get({ id: id });
    })));
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

  newProject: function(){
    this.model = new App.Models.Project();
  },

  select2: function(){
    this.$('select').select2({ placeholder: 'Select a User' });
  },

  projectsPath: function(){
    window.location.href = '#projects';
  }

}));
