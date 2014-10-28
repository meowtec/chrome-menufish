var appData

var googleImageSearch = {
  "name": "Google 按图搜索",
  "url": "https://images.google.com.hk/searchbyimage?image_url={%imageUrl%}&hl=zh-CN&newwindow=1&safe=strict"
}
var baiduImageSearch = {
  "name": "百度按图搜索",
  "url": "http://stu.baidu.com/i?objurl={%imageUrl%}&filename=&rt=0&rn=10&ftn=extend.chrome.contextMenu&ct=1&stt=0&tn=shituresult"
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
    googleImageSearch: true,
    baiduImageSearch: true
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
  // baidu 按图搜索
  if (appData.settingMore.baiduImageSearch) {
    var setting = {
      "title": baiduImageSearch.name,
      "contexts": ["image"],
      "onclick": function (img) {
        var imgUrl = img.srcUrl
        var search_url = baiduImageSearch.url.replace(/{%imageUrl%}/g, encodeURI(imgUrl))
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

