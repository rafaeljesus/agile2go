describe('App.Models.Projects#initialize', function() {

  var newProject, attributes;

  beforeEach(function(){
    attributes = { id: 1, name: 'Agile2Go', company: 'Crafting', assignedUsers: [{ id: 1, name: 'Rafael Jesus' }] }
    newProject = new App.Models.Project(attributes);
  });

  it('should have assignedUsers', function() {
    var assignedUsers = newProject.assignedUsers;
    var typeCheck = assignedUsers instanceof App.Collections.Users;
    expect(typeCheck).toBeTruthy();
    expect(assignedUsers).toBeDefined();
    expect(assignedUsers.size()).toEqual(1);
  });

  it('should call assignments_attributes method when toJSON is called', function() {
    spyOn(newProject, 'assignments_attributes');
    newProject.toJSON();
    expect(newProject.assignments_attributes).toHaveBeenCalled();
  });

  it('should validate when model have required attributes', function(){
    expect(newProject.isValid()).toBeFalsy();
  });
});

describe("App.Models.Project assignedUsers:change", function() {
  it("re-parses the assignedUsers", function() {
    var assignedUsers = { assignedUsers: [{ name: 'Rafael Jesus' }, { name: 'Sophia de Jesus' }] };
    var project = new App.Models.Project(assignedUsers);
    expect(project.assignedUsers.size()).toEqual(2);

    project.set({ assignedUsers: [{ name: 'Sophia de Jesus' }] });
    expect(project.assignedUsers.size()).toEqual(1);
  });
});
