/* global chrome */

(function() {
  var defaultRules = window.defaultRules
  var appData

  // APP KEY
  var appKeys = {
    'weibo': ''
  }

  // 初次使用初始化 App
  function appInit() {
    defaultRules.share.forEach(function(item) {
      item.enabled = true
    })

    defaultRules.search.forEach(function(item) {
      item.enabled = true
    })

    defaultRules.imageSearch.forEach(function (item) {
      item.enabled = true
    })

    //contextMenuSwitch
    localStorage.setItem('switch', JSON.stringify({
      search: true,
      share: true,
      imageSearch: true
    }))
    localStorage.setItem('rules', JSON.stringify(defaultRules))
  }

  if (!getData().rules) {
    appInit()
  }

  function getData() {
    return {
      rules: JSON.parse(localStorage.getItem('rules')),
      switch: JSON.parse(localStorage.getItem('switch'))
    }
  }

  function getItem(itemId, space) {
    return appData.rules[space].find(function(item) {
      return item.id === itemId
    })
  }

  function initContextMenu() {

    chrome.contextMenus.removeAll()

    appData = getData()

    // 创建父菜单
    if(appData.switch.share) {
      var shareParentId = chrome.contextMenus.create({
        "title": "分享到...",
        "contexts": ["page"]
      }, function () {
      })

      // 分享
      appData.rules.share.forEach(function (item) {
        if (!item.enabled) {
          return
        }
        var setting = {
          title: item.name,
          contexts: ["page"],
          onclick: shareClick,
          parentId: shareParentId
        }
        item.id = chrome.contextMenus.create(setting, function () {
        })
      })
    }

    if(appData.switch.search) {
      var searchParentId = chrome.contextMenus.create({
        "title": "搜索",
        "contexts": ["selection"]
      }, function () {
      })

      // 搜索
      appData.rules.search.forEach(function (item) {
        if (!item.enabled) {
          return
        }
        var setting = {
          title: item.name,
          contexts: ["selection"],
          onclick: searchClick,
          parentId: searchParentId
        }
        item.id = chrome.contextMenus.create(setting, function () {
        })
      })
    }

    if(appData.switch.imageSearch) {
      var imageSearchParentId = chrome.contextMenus.create({
        "title": "以图搜图",
        "contexts": ["image"]
      }, function () {
      })

      appData.rules.imageSearch.forEach(function (item) {
        if (!item.enabled) {
          return
        }
        var setting = {
          title: item.name,
          contexts: ["image"],
          onclick: function (img) {
            var imgUrl = img.srcUrl
            var search_url = item.url.replace(/{%imageUrl%}/g, encodeURI(imgUrl))
            window.open(search_url)
          },
          parentId: imageSearchParentId
        }
        chrome.contextMenus.create(setting)
      })
    }
  }

  function shareClick(item, page) {
    var itemId = item.menuItemId
    var title = page.title
    var url = page.url
    var shareUrl = getItem(itemId, 'share').url
    if (shareUrl.search('weibo.com') > -1) {
      shareUrl = shareUrl + '&appkey=' + appKeys.weibo
    }
    shareUrl = shareUrl.replace(/{%url%}/g, encodeURIComponent(url)).replace(/{%title%}/g, encodeURIComponent(title))

    window.open(shareUrl)
  }

  function searchClick(item) {
    var itemId = item.menuItemId
    var keyword = item.selectionText
    var searchUrl = getItem(itemId, 'search').url
    searchUrl = searchUrl.replace(/{%word%}/g, encodeURIComponent(keyword))

    window.open(searchUrl)
  }

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.ask === 'reload') {
      initContextMenu()
    }

    if (request.ask === 'reset') {
      appInit()
      sendResponse()
    }
  })

  initContextMenu()
})()
