$(function(){
  var tabButtons = $('#nav-list button'),
      containers = $('#main-container').children();
  ;
  $('#nav-list').on('click', 'button', function(){
    tabButtons.parent().removeClass('selected');
    containers.hide();
    var button = $(this);
    button.parent().addClass('selected');
    var target = button.attr('tab-target');
    $(target).show();
  });
});