this.BackboneSync = this.BackboneSync || {};

BackboneSync.FayeSubscriber = (function() {

   function FayeSubscriber(collection, options) {
     this.collection = collection;
     this.client = new Faye.Client('http://' + window.location.hostname + ':9292/faye');
     this.channel = options.channel;
     this.subscribe();
   }

  FayeSubscriber.prototype.subscribe = function() {
    return this.client.subscribe('/sync/' + this.channel, _.bind(this.receive, this));
  };

  FayeSubscriber.prototype.receive = function(message) {
    var self = this;
    return $.each(message, function(event, eventArguments) {
      return self[event](eventArguments);
    });
  };

  FayeSubscriber.prototype.update = function(params) {
    var self = this;
    return $.each(params, function(id, attributes) {
      var model = self.collection.get(id);
      return model.set(attributes);
    });
  };

  FayeSubscriber.prototype.create = function(params) {
    var self = this;
    return $.each(params, function(id, attributes) {
      var model = new self.collection.model(attributes);
      return self.collection.add(model);
    });
  };

  FayeSubscriber.prototype.destroy = function(params) {
    var self = this;
    return $.each(params, function(id, attributes) {
    var model = self.collection.get(id);
      return self.collection.remove(model);
    });
  };

  return FayeSubscriber;

})();
