App.Routers.Site = Support.SwappingRouter.extend({
  initialize: function(options){
    this.el = $('#container');
    this.injector = options;
  },

  routes: {
    '': 'index'
  },

  index: function(){
    var view = new App.Views.SiteIndex(this.injector);
    this.swap(view);
  }

});
