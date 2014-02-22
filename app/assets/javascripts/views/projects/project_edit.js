App.Views.ProjectEdit = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView, {
  initialize : function(options){
    _.bindAll(this, 'render', 'saved');
    this.model = options.model;
    this.users = options.users;
    this.observe();
  },

  template: JST['projects/form'],

  events: {
    'click .submit' : 'update'
  },

  render: function(){
    this.renderTemplate();
    this.select2();
    this.renderAssignedUsers();
    return this;
  },

  serializeData: function(){
    return { model: this.model.toJSON(), users: this.users.toJSON() };
  },

  renderTemplate: function(){
    this.$el.html(this.template(this.serializeData()));
  },

  renderAssignedUsers: function(){
    var self = this;
    self.model.assignedUsers.each(function(model){
      self.$('select').val(model.get('user_id')).trigger('change');
    });
  },

  update: function(e){
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
     var message = I18n.t('flash.actions.create.notice', { model: 'Project' });
     this.successMessage(message);
  },

  projectsPath: function(){
    window.location.href = '#projects';
  },

  select2: function(){
    this.$('select').select2({ placeholder: 'Select a User' });
  }

}));
