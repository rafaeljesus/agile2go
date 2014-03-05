describe('App.Models.Tasks#initialize', function(){

  var newTask;

  beforeEach(function(){
    var attributes = { id: 1, title: 'Assigning a Tasks to others', priority: 5, points: 8, status: 'Todo', sprint: { id: 1 } };
    newTask = new App.Models.Task(attributes);
  });

  it('should have one sprint', function(){
    var sprint = newTask.sprint;
    var typeCheck = sprint instanceof App.Models.Sprint;
    expect(typeCheck).toBeTruthy();
    expect(sprint).toBeDefined();
  });

  it('should validate when model have required attributes', function(){
    expect(newTask.isValid()).toBeFalsy();
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
