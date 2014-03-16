App.Views.UserDestroy = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'destroyed');
    this.current_user = options.current_user;
  },

  destroy: function(){
    var content = { url: 'users/' + this.current_user.get('id'), type: 'delete', dataType: 'json', data: {_method: 'delete'} };
    $.ajax(content).done(this.destroyed);
  },

  destroyed: function(data){
    this.current_user.set({ signed_in: false });
    this.current_user.removeSession({});
    this.destroyedSuccess();
    this.rootPath();
  },

  destroyedSuccess: function(){
    var message = I18n.t('registrations.destroyed');
    new FlashMessages({ message: message }).success();
  },

  rootPath: function(){
    window.location.hash = '#';
  }

});
