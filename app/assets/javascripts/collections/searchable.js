Searchable  = (function(){

  function Searchable(){
    this.onSearch();
    this.onEnter();
  };

  Searchable.prototype.onSearch = function(){
    var self = this;
    $('.search').click(function(e){
      e.preventDefault();
      self._redirect($('#task-search').val());
    });
  };

  Searchable.prototype.onEnter = function(){
    var self = this;
    $('#task-search').keyup(function(e){
      if (e.which != 13) return;
      e.preventDefault();
      self._redirect(e.target.value);
    });
  };

  Searchable.prototype._redirect = function(value){
    if (value == '') window.location.hash = '#tasks';
    else window.location.hash = '#tasks/search/' + value;
  };

  return Searchable;

})();
