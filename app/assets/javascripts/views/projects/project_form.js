App.Views.ProjectForm = Backbone.View.extend({
  el: '#form-project',

  initialize: function(){
    _.bindAll(this, 'render', 'saved');
    if (this.model === undefined) this.newTask();
  },

  events: {
    'submit' : 'save'
  },

  render: function(){
    this.$el.html(JST['projects/new'](this.model.toJSON()));
    return this;
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
    this.model.set({ name: name, description: description, company: company });
  },

  saved: function() {
     this.newTask();
     this.render();
     this.savedMsg();
  },

  savedMsg: function(){
     var text = 'Project was successfully saved';
     $('#messages')
       .show()
       .html(JST['messages']({ type : 'Success', color : 'blue', text : text }))
       .fadeOut(4000);
  }

});
