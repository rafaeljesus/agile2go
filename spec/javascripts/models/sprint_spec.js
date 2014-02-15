describe('App.Models.Sprints#initialize', function(){

  var newSprint;

  beforeEach(function(){
    var attributes = { id: 1, daily: '10:00', points: 40, start_date: '01/01/2014', end_date: '15/01/2014', project: { id: 1, name: 'projectNameFake' } };
    newSprint = new App.Models.Sprint(attributes);
  });

  it('should have one project', function(){
    var project = newSprint.project;
    var typeCheck = project instanceof App.Models.Project;
    expect(typeCheck).toBeTruthy();
    expect(project).toBeDefined();
  });

  it('should validate when model have required attributes', function(){
    expect(newSprint.isValid()).toBeFalsy();
  });
});

describe('App.Models.Sprint project:change', function(){
  it('re-parse the project', function(){
    var project = { project: { id: 1, name: 'projectNameFake' } };
    var sprint = new App.Models.Sprint(project);
    expect(sprint.project).toBeDefined();
    sprint.set({ project: { name: 'Agile2Go' } });
    expect(sprint.project.get('name')).toEqual('Agile2Go');
  });
})
