App.Views.Dashboard = Support.CompositeView.extend({

  template: JST['dashboards/index'],

  initialize: function() {
    _.bindAll(this, 'render');
   this.bindTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template());
    this.$('#chart').addClass('dashboard').highcharts(this.model.toJSON());
    return this;
  }

});
