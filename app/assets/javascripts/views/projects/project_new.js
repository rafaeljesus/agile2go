App.Views.ProjectNew = Backbone.View.extend({
  initialize: function(options){
    _.bindAll(this, 'render', 'saved');
    this.users = options.users;
    this.newTask();
  },

  events: {
    'submit': 'save'
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
    this.model.get('users').add(this._selectedUsers());
    this.model.set({ name: name, description: description, company: company });
  },

  _selectedUsers: function(){
    var users = [],
        elem = this.$('select').find('option:selected');
    _.each(elem, function(el, i){
        users.push({ id: el.value, name: el.text });
    });
    return users;
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
     var message = 'Project was successfully created';
     new FlashMessages({ message: message }).success();
  }

});
