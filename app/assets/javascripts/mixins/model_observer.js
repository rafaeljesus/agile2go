App.Mixins.ModelObserver = {
  observe: function(){
    _.bindAll(this, 'onModelError', 'onModelInvalid');
    this.model.on('invalid', this.onModelInvalid);
    this.model.on('error', this.onModelError);
  },

  onModelInvalid: function(model, errors){
    this._errorView(model.validationError);
  },

  onModelError: function(model, response, options){
    var attributesWithErrors = JSON.parse(response.responseText).errors;
    this._errorView(attributesWithErrors);
  },

  successMessage: function(message){
     this._flashMessage(message).success();
  },

  errorMessage: function(message){
     this._flashMessage(message).error();
  },

  _flashMessage: function(message){
     return new FlashMessages({ message: message });
   },

  _errorView: function(attributesWithErrors){
    new ErrorView({ el: $('form'), attributesWithErrors: attributesWithErrors }).render();
  }

}
