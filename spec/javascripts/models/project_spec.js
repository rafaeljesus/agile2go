describe('App.Models.Projects', function() {
  it('should have assignedUsers', function() {
    var newProject = new App.Models.Project({});
    expect(newProject.assignedUsers).toBeDefined();
  });

  it('should call assignments_attributes method when toJSON is called', function() {
    var newProject = new App.Models.Project({});
    spyOn(newProject, 'assignments_attributes');
    newProject.toJSON();
    expect(newProject.assignments_attributes).toHaveBeenCalled();
  });

  it('should validate when model have required attributes', function(){
    var newProject = new App.Models.Project({});
    expect(newProject.isValid()).toBeFalsy();
  });
});
