App.TasksSync = (function() {

   function TasksSync(collection, options) {
     this.collection = collection;
     this.firebase = new Firebase('https://scorching-heat-1523.firebaseio.com/');
     this.subscribe();
   }

  TasksSync.prototype = {
    subscribe: function() {
      this.firebase.subscribe('/sync/' + this.channel, _.bind(this.receive, this));
    },

    receive: function(message) {
      var self = this;
      $.each(message, function(event, eventArguments) {
        self[event](eventArguments);
      });
    },

    update: function(params) {
      var self = this;
      $.each(params, function(id, attributes) {
        var model = self.collection.get(id);
        model.set(attributes);
      });
    },

    create: function(params) {
      var self = this;
      $.each(params, function(id, attributes) {
        var model = new self.collection.model(attributes);
        self.collection.add(model);
      });
    },

    destroy: function(params) {
      var self = this;
      $.each(params, function(id, attributes) {
        var model = self.collection.get(id);
        self.collection.remove(model);
      });
    }
  };

  return TasksSync;

})();
