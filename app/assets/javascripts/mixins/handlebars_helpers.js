App.Mixins.HandlebarsHelpers = {

  addDiffDateHelper: function() {
    Handlebars.registerHelper('diffDate', function(start_date, end_date) {
      if (!start_date && !end_date) return;
        start_date = moment(start_date), end_date = moment(end_date);
        var diff = end_date.diff(start_date, 'days');
        if(diff == 0) return 'Today';
        return diff + ' day(s)';
    });
  },

  addPrettyDateHelper: function() {
    Handlebars.registerHelper('prettyDate', function(created_at) {
      if (!created_at) return;
        return $.timeago(created_at);
    });
  }

};
