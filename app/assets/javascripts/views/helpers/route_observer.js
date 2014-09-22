App.Views.RouteObserver = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'observe');
    $(window).on('hashchange', this.observe);
  },

  observe: function() {
    if (this.isHash('projects')) {
      $("a[href='#sprints'], a[href='#tasks'], a[href='#dashboard']").removeClass('active');
      $("a[href='#projects']").addClass('active');
    } else if (this.isHash('sprints')) {
      $("a[href='#projects'], a[href='#tasks'], a[href='#dashboard']").removeClass('active');
      $("a[href='#sprints']").addClass('active');
    } else if (this.isHash('tasks')) {
      $("a[href='#projects'], a[href='#sprints'], a[href='#dashboard']").removeClass('active');
      $("a[href='#tasks']").addClass('active');
    } else if (this.isHash('dashboard')) {
      $("a[href='#projects'], a[href='#sprints'], a[href='#tasks']").removeClass('active');
      $("a[href='#dashboard']").addClass('active');
    }
  },

  isHash: function(name) {
    return window.location.hash == '#' + name;
  }

});
