window.defaultRules = {
  share: [
    {
      'name': '新浪微博',
      'url': 'https://service.weibo.com/share/share.php?url={%url%}&title={%title%}'
    },
    {
      'name': 'qq空间',
      'url': 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={%url%}&title={%title%}'
    },
    {
      'name': '人人',
      'url': 'https://share.renren.com/share/buttonshare.do?link={%url%}&title={%title%}'
    },
    {
      'name': '豆瓣',
      'url': 'https://www.douban.com/recommend/?url={%url%}&name={%title%}'
    }
  ],
  search: [
    {
      'name': 'Google',
      'url': 'https://www.google.com.hk/#&q={%word%}&ie=utf-8'
    },
    {
      'name': '百度',
      'url': 'https://www.baidu.com/s?wd={%word%}&ie=utf-8'
    },
    {
      'name': '淘宝',
      'url': 'https://s.taobao.com/search?q={%word%}&ie=utf-8'
    },
    {
      'name': '百度地图',
      'url': 'https://map.baidu.com/m?word={%word%}&ie=utf-8'
    },
    {
      'name': '网易云音乐',
      'url': 'https://music.163.com/#/search/m/?s={%word%}&type=1'
    },
    {
      'name': '知乎',
      'url': 'https://www.zhihu.com/search?q={%word%}&type=question'
    },
    {
      'name': '优酷视频',
      'url': 'https://so.youku.com/search_video/q_{%word%}'
    },
    {
      'name': '微博',
      'url': 'https://s.weibo.com/weibo/{%word%}'
    },
    {
      'name': '百度翻译',
      'url': 'https://fanyi.baidu.com/#auto/auto/{%word%}'
    }
  ],
  imageSearch: [
    {
      'name': 'Google 按图搜索',
      'url': 'https://images.google.com.hk/searchbyimage?image_url={%imageUrl%}&hl=zh-CN&newwindow=1&safe=strict'
    },
    {
      'name': 'Yandex 按图搜索',
      'url': 'https://yandex.ru/images/search?text={%imageUrl%}&family=yes'
    }
  ]
}
