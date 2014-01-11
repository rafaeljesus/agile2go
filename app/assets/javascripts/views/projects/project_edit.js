App.Views.ProjectEdit = Backbone.View.extend({
  initialize : function(options){
    _.bindAll(this, 'render', 'saved', 'notSaved');
    this.model = options.model;
    this.users = options.users;
  },

  events: {
    'submit' : 'update'
  },

  render: function(){
    this.renderTemplate();
    this.select2();
    this.renderAssignedUsers();
    return this;
  },

  renderTemplate: function(){
    this.$el.html(JST['projects/form']({ self: this.model.toJSON(), users: this.users.toJSON() }));
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
    this.model.save({}, { success: this.saved, error: this.notSaved });
    return false;
  },

  commit: function(){
    var name = this.$("input[name='project[name]']").val(),
        description = this.$("textarea[name='project[description]']").val(),
        company = this.$("input[name='project[company]']").val();
    this.model.assignedUsers = new App.Collections.Users(this.assignedUsers());
    this.model.set({ name: name, description: description, company: company });
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
     this.savedMsg();
  },

  notSaved: function(model, xhr, options){
    var errors = JSON.parse(xhr.responseText).errors;
    new FlashMessages({ message: errors }).error();
  },

  projectsPath: function(){
    window.location.href = '/#/projects';
  },

  savedMsg: function(){
     var message = 'Project was successfully updated';
     new FlashMessages({ message: message }).success();
  },

  select2: function(){
    this.$('select').select2({ placeholder: 'Select a User' });
  }

 });
