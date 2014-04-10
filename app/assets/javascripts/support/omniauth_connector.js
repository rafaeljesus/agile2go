var OmniauthConnect = (function() {

  function OmniauthConnect(options){
    for (var attr in options) {
      this[attr] = options[attr] || {}; 
    }
  }

  OmniauthConnect.prototype.exec = function() {
    var self = this,
    params = 'location=0,status=0,menubar=no,width=600,height=400,left=350,top=200';
    this.auth_window = window.open(this.url, 'authWindow', params);
    this.interval = window.setInterval((function() {
      if (self.auth_window.closed) {
        window.clearInterval(self.interval);
        self.finish();
      }
    }), 1000);
    document.cookie = 'oauth_popup=1; path=/';
  }

  OmniauthConnect.prototype.finish = function() {
    var self = this;
    $.getJSON('/auth/check/' + self.provider).done(function(attrs){
      self.authenticatedCallback(self.view, attrs);
    });
  };

  return OmniauthConnect;

})();
