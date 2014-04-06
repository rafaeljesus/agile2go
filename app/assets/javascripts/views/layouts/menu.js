App.Views.Menu = Backbone.View.extend(
  _.extend({}, App.Mixins.BaseView, {
  el: '#menu',

  initialize: function(options){
    _.bindAll(this, 'render');
    this.current_user = options.current_user
    this.listenTo(this.current_user, 'change:signed_in', this.render);
    this.itemsPartial();
    this.render();
    this.dropdown();
  },

  template: JST['layouts/menu'],

  items: JST['layouts/menu_items'],

  serializeData: function(){
    return { current_user: this.current_user.toJSON() };
  },

  onRender: function(){
    this.dropdown();
  },

  itemsPartial: function(){
    Handlebars.registerPartial('menu_items', this.items);
  },

  dropdown: function(){
    setTimeout(function(){
      this.$('.ui.dropdown').dropdown();
    }, 1000);
  }

}));
