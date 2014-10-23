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