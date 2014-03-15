App.Views.Dashboard = Support.CompositeView.extend({
  initialize: function(){
    _.bindAll(this, 'render');
   this.bindTo(this.model, 'change', this.render);
   this.activeMenu();
  },

  render: function(){
    this.$el.addClass('dashboard').highcharts(this.serializeData());
  },

  serializeData: function(){
    return {
      chart: {
        type: 'bar'
        },
        title: {
          text: 'Dashboard'
        },
        colors: ['#AA4643', '#80699B', '#4572A7', '#89A54E' ],
        xAxis: {
          categories: this.model.get('categories')
        },
        yAxis: {
          title: 'Qty'
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          },
        },
        series: this.model.get('series')
      }
  },

  activeMenu: function(){
    this.$("a[href='#projects']").removeClass('active');
    this.$("a[href='#sprints']").removeClass('active');
    this.$("a[href='#tasks']").removeClass('active');
  }

});
