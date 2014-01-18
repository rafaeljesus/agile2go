App.Routers.UserRegistrations = Support.SwappingRouter.extend({
  routes: {
    'users/new': 'new'
  },

  new: function(){
    var view = new App.Views.UserRegistrations({});
    this.swap(view);
  }
});
