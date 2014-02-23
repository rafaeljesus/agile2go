App.Views.SiteIndex = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render');
    this.current_user = options.current_user;
    this.bindTo(this.current_user, 'change:signed_in', this.render);
  },

  template: JST['site/index'],

  onRender: function(){
    if(this.current_user.signedIn()) new App.Views.Dashboard({ el: this.$el }).render();
    else this.rotate();
    return this;
  },

  serializeData: function(){
    return { current_user: this.current_user };
  },

  rotate: function(){
    $('.rotate').textrotator({ animation: "dissolve", separator: ",", speed: 4000 });
  }

}));
