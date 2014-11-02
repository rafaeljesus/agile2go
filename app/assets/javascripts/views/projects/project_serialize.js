App.Views.ProjectSerialize = (function() {

  function ProjectSerialize(view) {
    this.view = view;
  }

  ProjectSerialize.prototype.toAttributes = function() {
    return {
      name: this.view.$('#name').val(),
      description: this.view.$('#description').val(),
      company: this.view.$('#company').val()
    }
  };

  ProjectSerialize.prototype.toUsersIds = function() {
    var selectedUsers = this.view.$('select').find('option:selected');
    return selectedUsers.map(function(n, select) {
      return $(select).val();
    });
  };

  return ProjectSerialize;

})();
