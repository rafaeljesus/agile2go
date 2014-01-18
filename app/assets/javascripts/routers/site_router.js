App.Routers.Site = Support.SwappingRouter.extend({
  initialize: function(options){
    this.el = $('#container');
    this.current_user = options.current_user;
  },

  routes: {
    '': 'index'
  },

  index: function(){
    var view = new App.Views.SiteIndex({ current_user: this.current_user });
    this.swap(view);
  }

});
