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
    v: '1.3.0',
    build: 11
  }

  $('#current-version').html(version.v)

  var updateNotice = function(data) {
    var build = version.build
    if (data.build > build) {
      $('#nav-list .help').addClass('notice')
      $('#version-notice-text').html('<a href="http://fish.cateyes.blue/">Menu fish</a> 有新版本：' + data.v)
    }
    else {
      $('#version-notice-text').html('您的应用是最新版本')
    }
  }

  $.get('http://fish.cateyes.blue/version.json?' + Date.now(), function(data) {
    updateNotice(data)
  }, 'json')
})
