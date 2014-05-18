ActiveNav = (function(){

  function ActiveNav(){
    this.observeRoute();
  }

  ActiveNav.prototype.observeRoute = function(){
    var self = this;
    $(window).on('hashchange', function(e){
      if(self._isHash('projects')){
        $("a[href='#sprints'], a[href='#tasks'], a[href='#dashboard']").removeClass('active');
        $("a[href='#projects']").addClass('active');
      } else if (self._isHash('sprints')){
        $("a[href='#projects'], a[href='#tasks'], a[href='#dashboard']").removeClass('active');
        $("a[href='#sprints']").addClass('active');
      } else if (self._isHash('tasks')){
        $("a[href='#projects'], a[href='#sprints'], a[href='#dashboard']").removeClass('active');
        $("a[href='#tasks']").addClass('active');
      } else if (self._isHash('dashboard')){
        $("a[href='#projects'], a[href='#sprints'], a[href='#tasks']").removeClass('active');
        $("a[href='#dashboard']").addClass('active');
      }
    });
  };

  ActiveNav.prototype._isHash = function(name){
    return window.location.hash == '#' + name;
  };

  return ActiveNav;

})();
