App.Views.Dashboard = Backbone.View.extend({
  initialize: function(){
    _.bindAll(this, 'render');
  },

  render: function(){
    $(this.$el).addClass('dashboard').highcharts(this.dashboardData());
  },

  dashboardData: function(){
    return {
      chart: {
        type: 'bar'
        },
        title: {
          text: 'Dashboard'
        },
        colors: ['#AA4643', '#80699B', '#4572A7', '#89A54E' ],
        xAxis: {
          categories: ['Agile2Go', 'Discourse', 'Grupon', 'Erepair', 'Epoll']
        },
        yAxis: {
          title: 'Qty'
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          },
        },
        series: [{ name: 'todo', data: [107, 31, 635, 203, 2] },
                 { name: 'ongoing', data: [133, 156, 947, 408, 6] },
                 { name: 'test', data: [973, 914, 4054, 732, 34] },
                 { name: 'done', data: [973, 5014, 4704, 772, 43] }]
      }
  }

});
