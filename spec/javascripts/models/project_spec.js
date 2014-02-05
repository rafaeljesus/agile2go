describe('App.Models.Projects#initialize', function() {

  var newProject, attributes;

  beforeEach(function(){
    attributes = { id: 1, name: 'Agile2Go', company: 'Crafting', assignedUsers: [{ id: 1, name: 'Rafael Jesus' }] }
    newProject = new App.Models.Project(attributes);
  });

  it('should have assignedUsers', function() {
    expect(newProject.assignedUsers).toBeDefined();
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
