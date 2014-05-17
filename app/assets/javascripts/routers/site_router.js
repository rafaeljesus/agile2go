App.Routers.Site = Support.SwappingRouter.extend({
  initialize: function(options){
    this.el = $('#container');
    this.options = options;
  },

  routes: {
    '': 'index'
  },

  index: function(){
    var view = new App.Views.SiteIndex(this.options);
    this.swap(view);
  }

});
