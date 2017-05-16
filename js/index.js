$(document).ready(function() {
  $('a[href^="http://"],a[href^="https://"]')
    .attr("target", "_blank")
    .addClass("ext_link");
});