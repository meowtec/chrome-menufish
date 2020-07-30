/* global $ */

$(function() {
  // tab 导航
  var tabButtons = $('#nav-list button')
  var containers = $('#main-container').children()

  $('#nav-list').on('click', 'button', function() {
    tabButtons.parent().removeClass('selected')
    containers.hide()
    var button = $(this)
    button.parent().addClass('selected')
    var target = button.attr('tab-target')
    $(target).show()
  })

  // 更新
  var version = {
    v: '1.4.0',
    build: 12
  }

  $('#current-version').html(version.v)
})
