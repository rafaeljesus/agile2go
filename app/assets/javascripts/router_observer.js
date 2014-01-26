var App = App || {};

App.RouterObserver = (function(){

  function RouterObserver(options){
    this.current_user = options.current_user;
    // self.roles = { master: 'master', po: 'po', team: 'team' };
  }

  RouterObserver.prototype.observe = function(){
    var self = this;
    _.each(App.Routers, function(value, key){
      key.on('route', self._checkPermission());
    });
  };

  RouterObserver.prototype._checkPermission = function(){
    if (!this.current_user.get('signed_in')) { window.location.hash = '/' };
    // var hasPermisson = this.roles[this.current_user.role];
  };

  return RouterObserver;

})();
