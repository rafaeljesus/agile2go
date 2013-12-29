App.Views.ProjectsNew = Backbone.View.extend({
  el : '#new-project',

  events : {
    'submit' : 'save'
  },

  initialize : function(){
    _.bindAll(this, 'render', 'saved');
    this.newTask();
    this.newTasks();
  },

  render : function(){
    this.$el.html(JST['projects/new']);
    return this;
  },

  newTask : function(){
    this.model = new App.Models.Project();
  },

  newTasks : function(){
    this.collection = new App.Collections.Projects();
  },

  save : function(e){
    e.preventDefault();
    this.$('.form').addClass('loading');
    this.commit();
    this.model.save({}, { success: this.saved });
    return false;
  },

  commit : function(){
    var name = this.$("input[name='project[name]']").val(),
        description = this.$("textarea[name='project[description]']").val(),
        company = this.$("input[name='project[company]']").val();
    this.model.set({ name: name, description: description, company: company });
  },

  saved : function() {
     this.$('.form').removeClass('loading');
     this.collection.add(this.model);
     this.newTask();
     this.newTasks();
     this.render();
     this.successMsg();
  },

  successMsg : function(){
     var text = 'Project was successfully created';
     $('#messages')
       .show()
       .html(JST['messages']({ type : 'Success', color : 'blue', text : text }))
       .fadeOut(4000);
  }

});
