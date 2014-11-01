var FIREBASE_URL = FIREBASE_URL || 'https://agile2go-test.firebaseio.com/';

App.Collections.Tasks = Backbone.Firebase.Collection.extend({
  model: App.Models.Task,
  firebase: FIREBASE_URL
});
