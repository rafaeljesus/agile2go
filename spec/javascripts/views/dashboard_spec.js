describe('App.Views.Dashboard', function(){

  var $el
  , view
  , model;

  beforeEach(function(){
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
    view = new App.Views.Dashboard({ $el: $('#container'), model: model });
    $el = $(view.render().el);
  });

  it('should render a dashboard model', function() {
    expect($el).toHaveText(/Fake/);
  });

});
