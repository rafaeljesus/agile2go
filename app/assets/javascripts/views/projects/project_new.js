App.Views.ProjectNew = Backbone.View.extend({
  el: '#form-project',

  initialize: function(options){
    _.bindAll(this, 'render', 'saved');
    this.users = options.users;
    this.newTask();
  },

  events: {
    'submit' : 'save'
  },

  render: function(){
    this.renderTemplate();
    this.select2();
    return this;
  },

  renderTemplate: function(){
    this.$el.html(JST['projects/form']({ self: this.model.toJSON(), users: this.users.toJSON() }));
  },

  newTask: function(){
    this.model = new App.Models.Project();
  },

  save: function(e){
    e.preventDefault();
    this.commit();
    this.model.save({}, { success: this.saved });
    return false;
  },

  commit: function(){
    var name = this.$("input[name='project[name]']").val(),
        description = this.$("textarea[name='project[description]']").val(),
        company = this.$("input[name='project[company]']").val();
    this.model.set({ name: name, description: description, company: company, users: this._selectedUsers() });
  },

  _selectedUsers: function(){
    var userIds = [],
        users = this.$('select').find('option:selected');
    $.each(users, function(i, user){
        userIds.push(user.value);
    });
    return userIds;
  },

  saved: function() {
     this.newTask();
     this.render();
     this.savedMsg();
  },

  select2: function(){
    this.$('select').select2({ placeholder: 'Select a User' });
  },

  savedMsg: function(){
     var message = 'Project was successfully created',
         flash = new FlashMessages({ message: message });
     flash.success();
  }

});
