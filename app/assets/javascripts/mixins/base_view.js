App.Mixins.BaseView = {
  render: function(){
    var data = this.serializeData ? this.serializeData() : undefined;
    this.$el.html(this.template(data));
    if(this.onRender){ this.onRender(); };
    return this;
  },

  rootPath: function(){
    window.location.hash = '';
  }

}
