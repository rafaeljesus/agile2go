var TwitterConnect = (function() {

  function TwitterConnect(options){
    this.view = options.view;
    this.url = options.url;
    this.authenticatedCallback = options.authenticatedCallback;
  }

  TwitterConnect.prototype.exec = function() {
    var self = this,
    params = 'location=0,status=0,width=800,height=600';
    this.twitter_window = window.open(this.url, 'twitterWindow', params);
    this.interval = window.setInterval((function() {
      if (self.twitter_window.closed) {
        window.clearInterval(self.interval);
        self.finish();
      }
    }), 1000);
    document.cookie = 'twitter_oauth_popup=1; path=/';
  }

  TwitterConnect.prototype.finish = function() {
    var self = this;
    $.getJSON('/auth/check/twitter').done(function(response){
      var attrs = { signed_in: true, id: response.user_id, provider: response.provider };
      self.authenticatedCallback(self.view, attrs);
    });
  };

  return TwitterConnect;

})();
