App.Mixins.BaseView = {
  render: function(){
    var data = this.serializeData ? this.serializeData() : undefined;
    this.$el.html(this.template(data));
    if(this.onRender){ this.onRender(); };
    return this;
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
