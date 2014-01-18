App.Routers.Site = Support.SwappingRouter.extend({
  initialize: function(){
    this.el = $('#container');
  },

  routes: {
    '': 'index'
  },

  index: function(){
    var view = new App.Views.SiteIndex({});
    this.swap(view);
  }

});
