App.Mixins.BaseView = {

  render: function() {
    var data;
    if (this.serializeData) {
      data = this.serializeData();
    }
    this.$el.html(this.template(data));
    if (this.onRender) {
      this.onRender();
    };
    return this;
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

  rootPath: function(){
    window.location.hash = '';
  }

}
