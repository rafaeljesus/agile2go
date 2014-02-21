App.Views.SiteIndex = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render');
    this.current_user = options.current_user;
    this.bindTo(this.current_user, 'change:signed_in', this.render);
  },

  template: JST['site/index'],

  render: function(){
    if (this.current_user.signedIn()) new App.Views.Dashboard({ el: this.$el }).render();
    else this.renderTemplate();
    return this;
  },

  renderTemplate: function(){
    this.$el.html(this.template(this.serializeData()));
    this.rotate();
  },

  serializeData: function(){
    return { current_user: this.current_user };
  },

  // FIXME not working after renderTemplate
  rotate: function(){
    $('.rotate').textrotator({ animation: "dissolve", separator: ",", speed: 4000 });
  }

});
