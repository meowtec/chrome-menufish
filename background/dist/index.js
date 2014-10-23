(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var rules = {
  share: [
    {
      "name": "新浪微博",
      "url": "http://service.weibo.com/share/share.php?url={%url%}&title={%title%}"
    },
    {
      "name": "qq空间",
      "url": "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={%url%}&title={%title%}"
    },
    {
      "name": "腾讯微博",
      "url": "http://share.v.t.qq.com/index.php?c=share&a=index&url={%url%}&title={%title%}"
    },
    {
      "name": "人人",
      "url": "http://share.renren.com/share/buttonshare.do?link={%url%}&title={%title%}"
    },
    {
      "name": "豆瓣",
      "url": "http://www.douban.com/recommend/?url={%url%}&name={%title%}"
    },
    {
      "name": "搜狐",
      "url": "http://t.sohu.com/third/post.jsp?url={%url%}&title={%title%}"
    }
  ],
  search: [
    {
      "name": "Google",
      "url": "https://www.google.com.hk/#&q={%word%}&ie=utf-8"
    },
    {
      "name": "百度搜索",
      "url": "http://www.baidu.com/s?wd={%word%}&ie=utf-8"
    },
    {
      "name": "淘宝",
      "url": "http://s.taobao.com/search?q={%word%}&ie=utf-8"
    },
    {
      "name": "百度图片",
      "url": "http://image.baidu.com/i?word={%word%}&ie=utf-8"
    },
    {
      "name": "虾米音乐",
      "url": "http://www.xiami.com/search?key={%word%}"
    },
    {
      "name": "wiki",
      "url": "http://zh.wikipedia.org/wiki/{%word%}"
    },
    {
      "name": "知乎",
      "url": "http://www.zhihu.com/search?q={%word%}&type=question"
    },
    {
      "name": "搜库视频",
      "url": "http://www.soku.com/search_video/q_{%word%}"
    },
    {
      "name": "新浪微博搜索",
      "url": "http://s.weibo.com/weibo/{%word%}"
    }
  ]
}
module.exports = rules
},{}],2:[function(require,module,exports){
var defaultRules = require('./default').rules

var appData

var googleImageSearch = {
  "name": "Google按图搜索",
  "url": "https://images.google.com.hk/searchbyimage?image_url={%imageUrl%}&hl=zh-CN&newwindow=1&safe=strict"
}

// APP KEY
var appKeys = {
  'weibo': '1673339308'
}

// 初次使用初始化 App
function appInit() {
  defaultRules.share.forEach(function (item) {
    item.enabled = true
  })
  defaultRules.search.forEach(function (item) {
    item.enabled = true
  })
  localStorage.setItem('rules', JSON.stringify(defaultRules))
  localStorage.setItem('settingMore', JSON.stringify({
    googleImageSearch: true
  }))
}
if (!getData().rules) {
  appInit()
}

function getData() {
  return {
    rules: JSON.parse(localStorage.getItem('rules')),
    settingMore: JSON.parse(localStorage.getItem('settingMore'))
  }
}

function getItem(itemId, space) {
  return appData.rules[space].find(function (item) {
    return item.id === itemId
  })
}

function initContextMenu() {

  chrome.contextMenus.removeAll()

  // 创建父菜单
  var shareParentId = chrome.contextMenus.create({
    "title": "分享到...",
    "contexts": ["page"]
  }, function () {
  })
  var searchParentId = chrome.contextMenus.create({
    "title": "搜索",
    "contexts": ["selection"]
  }, function () {
  })

  appData = getData()

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

  // google 按图搜索
  if (appData.settingMore.googleImageSearch) {
    var setting = {
      "title": googleImageSearch.name,
      "contexts": ["image"],
      "onclick": function (img) {
        var imgUrl = img.srcUrl
        var search_url = googleImageSearch.url.replace(/{%imageUrl%}/g, encodeURI(imgUrl))
        window.open(search_url)
      }
    }
    chrome.contextMenus.create(setting)
  }
}

function shareClick(item, page) {
  var itemId = item.menuItemId
  var title = page.title
  var url = page.url
  var shareUrl = getItem(itemId, 'share').url
  if(shareUrl.search('weibo.com') > -1){
    shareUrl = shareUrl + '&appkey=' + appKeys.weibo
  }
  shareUrl = shareUrl.replace(/{%url%}/g, encodeURI(url)).replace(/{%title%}/g, encodeURI(title))
  window.open(shareUrl)
}

function searchClick(item) {
  var itemId = item.menuItemId
  var keyword = item.selectionText
  var searchUrl = getItem(itemId, 'search').url

  searchUrl = searchUrl.replace(/{%word%}/g, encodeURI(keyword))
  window.open(searchUrl)
}
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  if (request.ask === 'reload') {
    initContextMenu()
  }
  if (request.ask === 'reset') {
    appInit()
    sendResponse()
  }
})
initContextMenu()


},{"./default":1}]},{},[2]);
