myfunc = function(){
  var full_page = document.getElementsByClassName("full_page");
  if (full_page.length != 0) {
    full_page[0].style.background = "transparent";
  }
}

$(document).on('pjax:end', function() {
    myfunc();
});

myfunc();
