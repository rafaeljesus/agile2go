App.Views.ProjectEdit = Backbone.View.extend({
  el : '#new-project',

  initialize : function(){
    _.bindAll(this, 'render')
  },

  events : {
    'submit' : 'update'
  },


});
