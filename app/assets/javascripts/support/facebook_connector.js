var FacebookConnect = (function(){

  function FacebookConnect(options){
    for (var attr in options) {
      this[attr] = options[attr] || {};
    }
  };

  FacebookConnect.prototype.login = function(){
    var self = this;
    FB.login(function(response) {
      $.getJSON('/auth/facebook/callback').done(function(response){
      var attrs = { signed_in: true, id: response.user_id, provider: response.provider };
      self.authenticatedCallback(self.view, attrs);
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

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
