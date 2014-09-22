App.Routers.Dashboards = Support.SwappingRouter.extend(
  _.extend({}, App.Mixins.Permissions, {

  initialize: function(options) {
    this.el = document.querySelector('#container');
    this.current_user = options.current_user;
    this.model = new App.Models.Dashboard();
  },

  routes: {
    'dashboard': 'index'
  },

  index: function() {
    this.authorize();
    this.model.fetch();
    var view = new App.Views.Dashboard({ model: this.model });
    this.swap(view);
  }

}));
