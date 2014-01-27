App.Routers.Projects = Support.SwappingRouter.extend({
  initialize: function(options){
    this.current_user = options.current_user;
    this.el = $('#container');
    this.collection = new App.Collections.Projects({});
    this.users = new App.Collections.Users({});
  },

  routes: {
    'projects': 'index',
    'projects/new': 'new',
    'projects/:id/edit': 'edit'
  },

  index: function(){
    this.ensureLoggedIn();
    this.collection.fetch({});
    var view = new App.Views.ProjectsIndex({ collection : this.collection });
    this.swap(view);
  },

  new: function(){
    this.ensureLoggedIn();
    this.users.fetch({});
    var view = new App.Views.ProjectNew({ users: this.users });
    this.swap(view);
  },

  edit: function(id){
    this.ensureLoggedIn();
    var self = this;
    $.getJSON("/projects/" + id  + "/edit").done(function(json){
      var model = new App.Models.Project(json[0]);
      this.users = new App.Collections.Users(json[1]);
      var view = new App.Views.ProjectEdit({ model: model, users: this.users });
      self.swap(view);
    });
  },

  ensureLoggedIn: function(){
    if (!this.current_user || !this.current_user.get('signed_in')) {
      window.location.hash = '/sessions/new';
      var message = 'You are not logged to access site content';
      new FlashMessages({ message: message }).error();
    };
  }

});
