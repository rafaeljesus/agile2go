App.Routers.UserSessions = Support.SwappingRouter.extend({
  initialize: function(options){
    this.el = $('#container');
    this.current_user = options.current_user;
    this.model = new App.Models.UserSession({});
  },

  routes: {
    'sessions/new': 'new',
    'sessions/destroy': 'destroy'
  },

  new: function(){
    var view = new App.Views.UserSessions({ current_user: this.current_user, model: this.model });
    this.swap(view);
  },

  destroy: function(){
    this.model.destroy({});
  }

});
