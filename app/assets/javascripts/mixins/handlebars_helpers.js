App.Mixins.HandlebarsHelpers = {

  diffDateHelper: function() {
    Handlebars.registerHelper('diffDate', function(end_date) {
      if (!end_date) return;
        var now = moment().toDate(), end_date = moment(end_date);
        var diff = end_date.diff(now, 'days');
        if(diff == 0) return new Handlebars.SafeString('<td class="negative">Today</td>');
        if(diff < 0) return new Handlebars.SafeString('<td class="positive">Finished</td>');
        if(diff == 1 || diff == 2) return new Handlebars.SafeString('<td class="warning">' + diff + ' day(s)</td>');
        return new Handlebars.SafeString('<td>' + diff + ' day(s)</td>');
    });
  },

  timeagoHelper: function() {
    Handlebars.registerHelper('timeago', function(created_at) {
      if (!created_at) return;
      return $.timeago(created_at);
    });
  },

  setI18nHbsHelper: function(){
    Handlebars.registerHelper('t', function(i18n_key) {
      var result = I18n.t(i18n_key);
      return new Handlebars.SafeString(result);
    });
  }

};
