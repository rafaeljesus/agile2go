App.Routers.UserSessions = Backbone.Router.extend({
  initialize: function(options){
    _.bindAll(this, 'destroy');
    this.model = options.model;
  },

  routes: {
    'user_sessions/destroy': 'destroy'
  },

  destroy: function(){
    this.model.destroy({ succsess: this.destroyed });
  },

  destroyed: function(model, response, options){
    var message = 'You successfully sign out';
    new FlashMessages({ message: message }).success();
  },

});
