App.HandlebarsHelpers = function(){ };

_.extend(App.HandlebarsHelpers.prototype, {

  withDiffDate: function() {
    Handlebars.registerHelper('diffDate', function(end_date) {
      if (!end_date) return;
      var now = moment().toDate(), end_date = moment(end_date);
      var diff = end_date.diff(now, 'days');
      if(diff == 0) return new Handlebars.SafeString('<td class="negative">Today</td>');
      if(diff < 0) return new Handlebars.SafeString('<td class="positive">Finished</td>');
      if(diff == 1 || diff == 2) return new Handlebars.SafeString('<td class="warning">' + diff + ' day(s)</td>');
      return new Handlebars.SafeString('<td>' + diff + ' day(s)</td>');
    });
    return this;
  },

  withTimeago: function() {
    Handlebars.registerHelper('timeago', function(created_at) {
      if (!created_at) return;
      return $.timeago(created_at);
    });
    return this;
  },

  withI18n: function(){
    Handlebars.registerHelper('t', function(i18n_key) {
      var result = I18n.t(i18n_key);
      return new Handlebars.SafeString(result);
    });
    return this;
  },

  withTruncate: function(){
    Handlebars.registerHelper('truncate', function(text, maxLength){
      if(text && text.length > maxLength){
        text = text.substr(0, maxLength-3) + "...";
      }
      return text;
    });
    return this;
  }

});


