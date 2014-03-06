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

describe('App.Models.Task change:sprint', function(){
  it('re-parse the sprint', function(){
    var sprint = { sprint: { id: 1, name: 'sprintNameFake' } };
    var task = new App.Models.Task(sprint);
    expect(task.sprint).toBeDefined();
    task.set({ task: { name: 'Create a new Task' } });
    expect(task.sprint.get('name')).toEqual('Create a new Task');
  });
});

describe('App.Models.Task change:assignedUsers', function(){
  it("re-parses the assignedUsers", function() {
    var assignedUsers = { assignedUsers: [{ name: 'Rafael Jesus' }, { name: 'Sophia de Jesus' }] };
    var task = new App.Models.Task(assignedUsers);
    expect(task.assignedUsers.size()).toEqual(2);

    task.set({ assignedUsers: [{ name: 'Sophia de Jesus' }] });
    expect(task.assignedUsers.size()).toEqual(1);
  });
});
