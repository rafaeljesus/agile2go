describe('App.Models.Sprints#initialize', function() {

  var newSprint;

  beforeEach(function() {
    var attributes = {
      id: 1,
      daily: '10:00',
      points: 40,
      start_date: '01/01/2014',
      end_date: '01/15/2014',
      project_id: '54309a91793f766b0b000019'
    };
    newSprint = new App.Models.Sprint(attributes);
  });

  it('should has one project', function() {
    var project = newSprint.project;
    var typeCheck = project instanceof App.Models.Project;
    expect(typeCheck).toBeTruthy();
    expect(project).toBeDefined();
  });

  it('should validate when model have required attributes', function() {
    expect(newSprint.isValid()).toBeFalsy();
  });
});

describe('App.Models.Sprint project:association', function() {

  it('re-parse the project', function() {
    var expectedId = '54309a91793f766b0b000020'
      , projectAttr = { project_id: '54309a91793f766b0b000019' }
      , sprint = new App.Models.Sprint(projectAttr);

    sprint.project.set({ id: expectedId });
    expect(sprint.project.get('id')).toEqual(expectedId);
  });

})
