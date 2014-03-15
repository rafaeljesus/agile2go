App.Views.SiteIndex = Support.CompositeView.extend({
  initialize: function(options){
    _.bindAll(this, 'render');
    this.current_user = options.current_user;
    this.bindTo(this.current_user, 'change:signed_in', this.render);
  },

  template: JST['site/index'],

  render: function(){
    if(this.current_user.signedIn()){
      window.location.hash = '#dashboard';
    } else {
      this.$el.html(this.template());
      var childView = new App.Views.LastCommit({});
      this.$('#last-commit').append(childView.el);
      this.renderChild(childView);
      this.rotate();
    }
    return this;
  },

  rotate: function(){
    setTimeout(function(){
      $('.rotate').textrotator({ animation: "dissolve", separator: ",", speed: 4000 });
    }, 1000);
  }

});
