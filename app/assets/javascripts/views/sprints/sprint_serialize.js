App.Views.SprintSerialize = (function() {

  function SprintSerialize(view) {
    this.view = view;
  }

  SprintSerialize.prototype.toAttributes = function() {
    return {
      name: this.view.$('#name').val(),
      start_date: this.parseDate('#start-date'),
      end_date: this.parseDate('#end-date'),
      daily: this.view.$('#daily').val(),
      points: this.view.$('#points').val()
    }
  };

  SprintSerialize.prototype.parseDate = function(id) {
    var start_date = this.view.$(id).val();
    if (start_date == '') return;
    return moment(start_date).format('YYYY-MM-DD');
  },

  SprintSerialize.prototype.assigneeId = function() {
    var selectedSprints = this.view.$('select').find('option:selected');
    return _.first(selectedSprints.map(function(n, select) {
      return $(select).val();
    }));
  };

  return SprintSerialize;

})();
