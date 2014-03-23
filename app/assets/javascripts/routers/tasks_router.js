App.Routers.Tasks = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.Permissions, {
  initialize: function(options){
    this.el = $('#container');
    this.current_user = options.current_user;
    this.collection = new App.Collections.Tasks({});
    this.sprints = new App.Collections.Sprints({});
    new BackboneSync.FayeSubscriber(this.collection, { channel: 'tasks' });
  },

  routes: {
    'tasks': 'index',
    'tasks/new': 'new',
    'tasks/:id/edit': 'edit'
  },

  index: function(){
    this.authorize();
    this.collection.fetch({});
    var view = new App.Views.TasksIndex({ collection: this.collection });
    this.swap(view);
    this.activeMenu();
  },

  new: function(){
    this.authorize();
    this.sprints.fetch({});
    var view = new App.Views.TaskForm({ sprints: this.sprints });
    this.swap(view);
  },

  edit: function(id){
    this.authorize();
    var self = this;
    $.getJSON("/tasks/" + id + "/edit").done(function(json){
      var model = new App.Models.Task(json[0]);
      self.sprints = new App.Collections.Sprints(json[1]);
      var view = new App.Views.TaskForm({ model: model, sprints: self.sprints });
      self.swap(view);
    });
  },

  activeMenu: function(){
    $("a[href='#projects'], a[href='#sprints'], a[href='#dashboard']").removeClass('active');
    $("a[href='#tasks']").addClass('active');
  }

}));
