describe('App.Views.Dashboard', function(){

  var $el
  , view
  , model;

  beforeEach(function(){
    var attributes = {
      categories: ['ProjectName1', 'ProjectName2'],
      series: [
        { name: 'Todo', data: [3, 10] },
        { name: 'Ongoing', data: [0, 2] },
        { name: 'Test', data: [2, 0] },
        { name: 'Done', data: [1, 0] }
      ]
    };
    model = new App.Models.Dashboard(attributes);
    view = new App.Views.Dashboard({ el: $('#container'), model: model});
    // $el = $(view.render().el); // throws Highcharts error #13: www.highcharts.com/errors/13"
  });

  // it('should render a dashboard model', function(){
  //   expect($el).toHaveText(/ProjectName1/);
  //   expect($el).toHaveText(/ProjectName2/);
  //   expect($el).toHaveClass(/dashboard/);
  // });

});
