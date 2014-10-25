describe('App.Models.Dashboard', function() {

  var model
  , expectedDashboardData = [
    { name: 'Todo', data: [10] },
    { name: 'Ongoing', data: [4] },
    { name: 'Test', data: [9] },
    { name: 'Done', data: [4] }
  ];

  beforeEach(function() {
    var attributes = {
      0: {
        id: '544476b47a373aa261555af8',
        project_name: 'Fake',
        todo_count: 10,
        ongoing_count: 4,
        test_count: 9,
        done_count: 4
      }
    }
    model = new App.Models.Dashboard(attributes);
  });

  it('should re-parses attributes on model change', function() {
    var dashboardJSON = {
      0: {
        id: "544476ba7a373aa261555af9",
        done_count: 0,
        ongoing_count: 1,
        project_name: "Rails",
        test_count: 2,
        todo_count: 1
      }
    }
    model.set(dashboardJSON);
    expect(model.getCategories()).toContain('Rails');
  });

  it('when toJSON called then return dashboard attributes', function() {
    var toJSON = model.toJSON();
    expect(toJSON).toEqual(jasmine.objectContaining({
      xAxis: { categories: model.getCategories() },
      series: model.getSeries()
    }));
  });

  it('should return categories array', function() {
    expect(model.getCategories()).toContain('Fake');
  });

  it('should return series array', function() {
    expect(model.getSeries()).toEqual(expectedDashboardData);
  });

});
