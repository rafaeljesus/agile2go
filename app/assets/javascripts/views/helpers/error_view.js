var ErrorView = Backbone.View.extend({
  initialize: function(options) {
    this.attributesWithErrors = this.options.attributesWithErrors;
    _.bindAll(this, 'clearOldErrors', 'renderErrors', 'renderError', 'fieldFor');
  },

  render: function() {
    this.clearOldErrors();
    this.renderErrors();
  },

  clearOldErrors: function() {
    this.$('.error').removeClass('error');
    this.$('div.ui.red.pointing.above.ui.label').remove();
  },

  renderErrors: function() {
    _.each(this.attributesWithErrors, this.renderError);
  },

  renderError: function(errors, attribute) {
    var errorString = errors.join(', ');
    var field = this.fieldFor(attribute);
    var errorTag = $('<div>').addClass('ui red pointing above ui label').text(errorString);
    field.append(errorTag);
    field.addClass('error');
  },

  fieldFor: function(attribute) {
    return this.$("[id='" + attribute + "_input']");
  }

});
