App.Routers.UserRegistrations = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.Permissions, {
  initialize: function(options){
    this.el = $('#container');
    this.current_user = options.current_user;
  },

  routes: {
    'users/new': 'new',
    'users/:id/edit': 'edit',
    'users/:id': 'destroy'
  },

  new: function(){
    var view = new App.Views.UserRegistrations({ current_user: this.current_user });
    this.swap(view);
  },

  edit: function(id){
    this.authorize();
    var self = this;
    $.getJSON("/users/" + id + "/edit").then(function(resp){
      var model = new App.Models.UserRegistration(resp, { parse: true })
      , view = new App.Views.UserRegistrations({ model: model, current_user: self.current_user });
      self.swap(view);
    });
  },

  destroy: function(){
    var view = new App.Views.UserDestroy({ current_user: this.current_user });
    view.destroy();
    this.swap(view);
  }

}));
