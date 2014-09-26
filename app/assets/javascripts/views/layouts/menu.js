App.Views.Menu = Backbone.View.extend(
  _.extend({}, App.Mixins.BaseView, {

  el: '#menu',
  template: JST['layouts/menu'],
  items: JST['layouts/menu_items'],

  initialize: function(options){
    _.bindAll(this, 'render');
    this.current_user = options.current_user
    this.listenTo(this.current_user, 'change:signed_in', this.render);
    this.itemsPartial();
    this.render();
  },

  serializeData: function(){
    return { current_user: this.current_user.toJSON() };
  },

  onRender: function(){
    setTimeout(function(){
      this.$('.ui.dropdown').dropdown();
      new Searchable();
    }, 1000);
  },

  itemsPartial: function(){
    Handlebars.registerPartial('menu_items', this.items);
  }

}));
