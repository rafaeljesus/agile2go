App.Views.TaskSerialize = (function() {

  function TaskSerialize(view) {
    this.view = view;
  }

  TaskSerialize.prototype.toAttributes = function() {
    return {
      status: this.view.$('#status').val(),
      priority: this.view.$('#priority').val(),
      points: this.view.$('#points').val(),
      title: this.view.$('#title').val(),
      story: this.view.$('#story').val()
    }
  };

  TaskSerialize.prototype.toSprintId = function() {
    var selectedSprint = this.view.$('#sprint').find('option:selected');
    return _.first(selectedSprint.map(this.setOptionValue));
  };

  TaskSerialize.prototype.toUsersIds = function() {
    var selectedUsers = this.view.$('#users').find('option:selected');
    return selectedUsers.map(this.setOptionValue);
  };

  TaskSerialize.prototype.setOptionValue = function(n, select) {
    return $(select).val();
  };

  return TaskSerialize;

})();
