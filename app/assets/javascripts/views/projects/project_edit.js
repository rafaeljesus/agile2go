App.Views.ProjectEdit = Backbone.View.extend({
  el : '#edit-project',

  events : {
    'submit' : 'update'
  },

  initialize : function(){
    _.bindAll(this, 'render')
  }

});
