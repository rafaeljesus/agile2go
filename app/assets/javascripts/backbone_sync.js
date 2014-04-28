this.BackboneSync = this.BackboneSync || {};

BackboneSync.FayeSubscriber = (function() {

   function FayeSubscriber(collection, options) {
     this.collection = collection;
     this.client = new Faye.Client(fayejsPath + '/faye');
     this.channel = options.channel;
     this.subscribe();
   }

  FayeSubscriber.prototype.subscribe = function() {
    this.client.subscribe('/sync/' + this.channel, _.bind(this.receive, this));
  };

  FayeSubscriber.prototype.receive = function(message) {
    var self = this;
    $.each(message, function(event, eventArguments) {
      self[event](eventArguments);
    });
  };

  FayeSubscriber.prototype.update = function(params) {
    var self = this;
    $.each(params, function(id, attributes) {
      var model = self.collection.get(id);
      model.set(attributes);
    });
  };

  FayeSubscriber.prototype.create = function(params) {
    var self = this;
    $.each(params, function(id, attributes) {
      var model = new self.collection.model(attributes);
      self.collection.add(model);
    });
  };

  FayeSubscriber.prototype.destroy = function(params) {
    var self = this;
    $.each(params, function(id, attributes) {
      var model = self.collection.get(id);
      self.collection.remove(model);
    });
  };

  return FayeSubscriber;

})();
