App.Utils = (function(){

  Utils = function(){
    Utils.prototype.initialize();
  }

  Utils.prototype.initialize = function(){
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $('.ui.popup').popup();
    $(".rotate").textrotator({
      animation: "dissolve",
      separator: ",",
      speed: 6000
    });
  };

})();
