App.Models.Dashboard = Backbone.Model.extend({
  urlRoot: '/dashboard',

  initialize: function() {
    this.on('change', this.setAttributes, this);
  },

  defaults: {
    chart: {
      categories: [],
      series: [
        { name: 'Todo', data: [] },
        { name: 'Ongoing', data: [] },
        { name: 'Test', data: [] },
        { name: 'Done', data: [] }]
    }
  },

  setAttributes: function() {
    var attributes = _.clone(this.attributes);
    delete attributes.chart;
    _.map(attributes, function(model, key) {
        if (!model) return;
        this.addCategory(model.project_name);
        this.addSeries(model);
    }, this);
  },

  addCategory: function(project_name) {
    this.get('chart').categories.push(project_name);
  },

  addSeries: function(model) {
    var serie = this.get('chart').series;
    serie[0].data.push(model.todo_count);
    serie[1].data.push(model.ongoing_count);
    serie[2].data.push(model.test_count);
    serie[3].data.push(model.done_count);
  },

  getCategories: function() {
    return this.get('chart').categories;
  },

  getSeries: function() {
    return this.get('chart').series;
  },

  toJSON: function() {
    var json = {};
    json.chart = { type: 'bar' };
    json.title = { text: 'Dashboard' };
    json.colors = ['#AA4643', '#80699B', '#4572A7', '#89A54E'];
    json.xAxis = { categories: this.getCategories() };
    json.yAxis = { title: 'Qty' };
    json.plotOptions = { series: { stacking: 'normal' } };
    json.series = this.getSeries();
    return json;
  }

});
