App.Views.SprintSerialize = (function() {

  function SprintSerialize(view) {
    this.view = view;
  }

  SprintSerialize.prototype.toAttributes = function() {
    return {
      name: this.view.$('#name').val(),
      start_date: this.parseStartDate(),
      end_date: this.parseEndDate(),
      daily: this.view.$('#daily').val(),
      points: this.view.$('#points').val()
    }
  };

  SprintSerialize.prototype.parseStartDate = function() {
    var start_date = this.view.$('#start-date').val();
    if (start_date == '') return;
    return moment(start_date).format('YYYY-MM-DD');
  },

  SprintSerialize.prototype.parseEndDate = function() {
    var end_date = this.view.$('#end-date').val();
    if (end_date == '') return;
    return moment(end_date).format('YYYY-MM-DD');
  },

  SprintSerialize.prototype.assigneeId = function() {
    var selectedSprints = this.view.$('select').find('option:selected');
    return _.first(selectedSprints.map(function(n, select) {
      return $(select).val();
    }));
  };

  return SprintSerialize;

})();
