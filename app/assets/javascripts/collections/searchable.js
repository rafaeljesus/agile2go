Searchable  = (function(){

  function Searchable(){
    $('#task-search').keyup(function(e){
      if (e.which != 13) return;
      window.location.hash = '#tasks/search/' + e.target.value;
    });
  };

  return Searchable;

})();
