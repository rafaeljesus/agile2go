App.Models.UserRegistration = Backbone.Model.extend({
  urlRoot: 'users',

  parse: function(response) {
    if (!response) return;
    return response.user;
  },

  validate: function(attrs, options) {
    var errors;
    if (!attrs.first_name) {
      (errors = errors || {}).name = ["can't be blank"];
    };
    if (!attrs.last_name) {
      (errors = errors || {}).name = ["can't be blank"];
    };
    if (!attrs.email) {
      (errors = errors || {}).email = ["can't be blank"];
    };
    if (!attrs.password) {
      (errors = errors || {}).password = ["can't be blank"];
    };
    if (attrs.password.length < 6) {
      (errors = errors || {}).password = ["6 is the minimun allowed"];
    };
    if (errors) return errors;
  }

});
