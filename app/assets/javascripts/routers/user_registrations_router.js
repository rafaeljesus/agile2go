App.Routers.UserRegistrations = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.Permissions, {
  initialize: function(options){
    this.el = $('#container');
    this.current_user = options.current_user;
  },

  routes: {
    'users/new': 'new',
    'users/:id/edit': 'edit'
  },

  new: function(){
    var view = new App.Views.UserRegistrations({ current_user: this.current_user });
    this.swap(view);
  },

  edit: function(id){
    this.authorize();
    var self = this;
    $.getJSON("/users/" + id + "/edit").done(function(response){
      var model = new App.Models.UserRegistration(response, { parse: true });
      var view = new App.Views.UserRegistrations({ model: model });
      self.swap(view);
    });
  }

}));
