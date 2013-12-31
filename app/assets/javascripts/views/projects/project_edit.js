App.Views.ProjectEdit = Backbone.View.extend({
  el: '#form-project',

  initialize : function(options){
    _.bindAll(this, 'render', 'saved');
    this.model = options.model;
    this.users = options.users;
  },

  events: {
    'submit' : 'update'
  },

  render: function(){
    this.renderTemplate();
    this.addSelect2();
    return this;
  },

  renderTemplate: function(){
    this.$el.html(JST['projects/form']({ self: this.model.toJSON(), users: this.users.toJSON() }));
  },

  update: function(e){
    e.preventDefault();
    this.commit();
    this.model.save({}, { success: this.saved });
    return false;
  },

  commit: function(){
    var name = this.$("input[name='project[name]']").val(),
        description = this.$("textarea[name='project[description]']").val(),
        company = this.$("input[name='project[company]']").val();
    this.model.set({ name: name, description: description, company: company });
  },

  saved: function() {
     this.projectsPath();
  },

  projectsPath: function(){
    window.location.href = '/projects';
  },

  addSelect2: function(){
    this.$('select').select2({ placeholder: 'Select a User' });
  },

  // not used yet
  updatedMsg: function(){
     var message = 'Project was successfully updated',
         flash = new App.Views.FlashMessages({ message: message });
     flash.success();
  }

});
