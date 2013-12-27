//= require jquery
//= require jquery_ujs
//= require underscore
//= require backbone
//= require backbone-support
//= require handlebars
//= require app
//= require jquery.simple-text-rotator
//= require_tree ../templates
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree .
//= require semantic-ui

$('.ui.dropdown').dropdown();
$('.ui.checkbox').checkbox();
$('.ui.popup').popup();
$(".rotate").textrotator({
  animation: "dissolve",
  separator: ",",
  speed: 6000
});
