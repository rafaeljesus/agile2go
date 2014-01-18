App.Routers.UserRegistrations = Support.SwappingRouter.extend({
  initialize: function(options){
    this.el = $('#container');
    this.current_user = options.current_user;
  },

  routes: {
    'users/new': 'new'
  },

  new: function(){
    var view = new App.Views.UserRegistrations({ current_user: this.current_user });
    this.swap(view);
  }
});
