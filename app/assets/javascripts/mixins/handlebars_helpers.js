App.Mixins.HandlebarsHelpers = {

  addDiffDateHelper: function() {
    Handlebars.registerHelper('diffDate', function(end_date) {
      if (!end_date) return;
        var now = moment().toDate(), end_date = moment(end_date);
        var diff = end_date.diff(now, 'days');
        if(diff == 0) return new Handlebars.SafeString('<td class="negative">Today</td>');
        if(diff < 0) return new Handlebars.SafeString('<td class="positive">Finished</td>');
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
