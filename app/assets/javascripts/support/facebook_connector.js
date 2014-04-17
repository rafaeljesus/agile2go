var FacebookConnect = (function(){

  function FacebookConnect(options){
    for (var attr in options) {
      this[attr] = options[attr] || {};
    }
  };

  FacebookConnect.prototype.login = function(){
    var self = this;
    FB.login(function(response) {
      $.getJSON('/auth/facebook/callback').done(function(json){
        self.authenticatedCallback(self.view, json);
      });
    });
  };

  FacebookConnect.prototype.logout = function(){
    FB.getLoginStatus(function(response) {
      if(!response.authResponse) return;
      FB.logout();
    });
  };

  return FacebookConnect;

})();

window.fbAsyncInit = function() {
  FB.init({
    appId: '621737011247997',
    cookie: true
  });
};
