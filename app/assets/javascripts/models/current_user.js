App.Models.CurrentUser = Backbone.Model.extend({
  urlRoot: 'current_user',

  defaults: {
    signed_in: false
  }
});
