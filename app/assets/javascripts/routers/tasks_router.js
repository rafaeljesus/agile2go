App.Routers.Tasks = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.Permissions, {

  initialize: function(options) {
    this.el = document.querySelector('#container');
    this.current_user = options.current_user;
    this.collection = new App.Collections.Tasks();
    this.sprints = new App.Collections.Sprints();
    this.users = new App.Collections.Users();
  },

  routes: {
    'tasks': 'index',
    'tasks/new': 'new',
    'tasks/:id/edit': 'edit',
    'tasks/search/:query': 'search'
  },

  index: function() {
    this.authorize();
    var view = new App.Views.TasksIndex({ collection: this.collection });
    this.swap(view);
  },

  new: function() {
    this.authorize();
    this.sprints.fetch();
    this.users.fetch();
    var options = {
      sprints: this.sprints,
      users: this.users,
      collection: this.collection
    }
    var view = new App.Views.TaskForm(options);
    this.swap(view);
  },

  edit: function(id) {
    this.authorize();
    this.sprints.fetch();
    this.users.fetch();
    var model = this.collection.get({ id: id });
    var options = {
      model: new App.Models.Task(model.toJSON()),
      sprints: this.sprints,
      users: this.users,
      collection: this.collection
    }
    var view = new App.Views.TaskForm(options);
    this.swap(view);
  },

  search: function(query) {
    var self = this;
    $.getJSON('/tasks/search/' + query).then(function(resp) {
      var collection = new App.Collections.Tasks(resp, { parse: true });
      var view = new App.Views.TasksIndex({ collection: collection });
      self.swap(view);
    });
  }

}));
