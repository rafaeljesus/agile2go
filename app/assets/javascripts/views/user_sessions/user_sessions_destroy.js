App.Views.UserSessionsDestroy = Support.CompositeView.extend({
  initialize: function(options){
    this.current_user = options.current_user;
  },

  destroy: function(){
    var self = this;
    var content = { url: 'user_sessions', type: 'post', dataType: 'json', data: {_method: 'delete'} };
    $.ajax(content).done(function(data){
      self.current_user.set({ signed_in: false });
      self.current_user.removeSession({});
      self.logoutSuccess();
      window.location.hash = '/';
    }).fail(function(error){
      console.log(error);
    });
  },

  logoutSuccess: function(){
    var message = 'You successfully logged out';
    new FlashMessages({ message: message }).success();
  },

});
