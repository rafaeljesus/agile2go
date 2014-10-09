App.Routers.Tasks = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.Permissions, {

  initialize: function(options) {
    this.el = document.querySelector('#container');
    this.current_user = options.current_user;
    this.collection = new App.Collections.Tasks();
    this.sprints = new App.Collections.Sprints();
    this.subscribe();
  },

  routes: {
    'tasks': 'index',
    'tasks/new': 'new',
    'tasks/:id/edit': 'edit',
    'tasks/search/:query': 'search'
  },

  index: function() {
    this.authorize();
    this.collection.fetch();
    var view = new App.Views.TasksIndex({ collection: this.collection });
    this.swap(view);
  },

  new: function() {
    this.authorize();
    this.sprints.fetch();
    var view = new App.Views.TaskForm({ sprints: this.sprints });
    this.swap(view);
  },

  edit: function(id) {
    this.authorize();
    this.sprints.fetch();
    var self = this;
    $.getJSON("/tasks/" + id + "/edit").then(function(resp) {
      var model = new App.Models.Task(resp);
      var view = new App.Views.TaskForm({ model: model, sprints: self.sprints });
      self.swap(view);
    });
  },

  search: function(query) {
    var self = this;
    $.getJSON('/tasks/search/' + query).then(function(resp) {
      var collection = new App.Collections.Tasks(resp, { parse: true });
      var view = new App.Views.TasksIndex({ collection: collection });
      self.swap(view);
    });
  },

  subscribe: function() {
    // new BackboneSync.FayeSubscriber(this.collection, { channel: 'tasks' });
  }

}));
