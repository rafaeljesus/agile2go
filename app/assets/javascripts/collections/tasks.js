App.Collections.Tasks = Backbone.Firebase.Collection.extend({
  model: App.Models.Task,
  firebase: 'https://scorching-heat-1523.firebaseio.com/'
});
