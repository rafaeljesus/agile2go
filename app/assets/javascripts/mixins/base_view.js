App.Mixins.BaseView = {
  render: function(){
    var data = this.serializeData ? this.serializeData() : undefined;
    this.$el.html(this.template(data));
    if(this.onRender){ this.onRender(); };
    return this;
  },

  modelObserve: function(){
    _.bindAll(this, 'onModelError', 'onModelInvalid');
    this.model.on('invalid', this.onModelInvalid);
    this.model.on('error', this.onModelError);
  },

  onModelInvalid: function(model, errors){
    new ErrorView({ el: $('form'), attributesWithErrors: model.validationError }).render();
  },

  onModelError: function(model, response, options){
    var attributesWithErrors = JSON.parse(response.responseText).errors;
    new ErrorView({ el: $('form'), attributesWithErrors: attributesWithErrors }).render();
  },

  successMessage: function(message){
     new FlashMessages({ message: message }).success();
  },

  errorMessage: function(message){
     new FlashMessages({ message: message }).error();
  },

  rootPath: function(){
    window.location.hash = '';
  },

  addPrettyDateHelper: function() {
    Handlebars.registerHelper('prettyDate', function(created_at) {
      if (!created_at) return;
        return $.timeago(created_at);
    });
  }

}
