App.Views.SiteIndex = Support.CompositeView.extend(
  _.extend({}, App.Mixins.BaseView, {
  initialize: function(options){
    _.bindAll(this, 'render');
    this.current_user = options.current_user;
    this.bindTo(this.current_user, 'change:signed_in', this.render);
  },

  template: JST['site/index'],

  onRender: function(){
    var childView;
    if(this.current_user.signedIn()){
      childView = new App.Views.Dashboard({ el: this.$el });
    } else {
      childView = new App.Views.LastCommit({});
      this.$('#last-commit').append(childView.el);
    }
    this.renderChild(childView);
    return this;
  }

}));
