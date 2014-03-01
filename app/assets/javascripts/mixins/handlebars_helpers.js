App.Mixins.HandlebarsHelpers = {

  addDiffDateHelper: function() {
    Handlebars.registerHelper('diffDate', function(start_date, end_date) {
      if (!start_date && !end_date) return;
        start_date = moment(start_date), end_date = moment(end_date);
        var diff = end_date.diff(start_date, 'days');
        if(diff == 0) return new Handlebars.SafeString('<td class="negative">Today</td>');
        if(diff == 1 || diff == 2) return new Handlebars.SafeString('<td class="warning">Today</td>');
        return new Handlebars.SafeString('<td>' + diff + ' day(s)</td>');
    });
  },

  addPrettyDateHelper: function() {
    Handlebars.registerHelper('prettyDate', function(created_at) {
      if (!created_at) return;
        return $.timeago(created_at);
    });
  }

};
