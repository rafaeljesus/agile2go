Searchable  = (function(){

  function Searchable(){
    $('#task-search').keyup(function(e){
      if (e.which != 13) return;
      var value = e.target.value;
      if (value == '') window.location.hash = '#tasks';
      else window.location.hash = '#tasks/search/' + value;
    });
  };

  return Searchable;

})();
