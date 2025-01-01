import { AppOptions } from '../types/index';

const defaultOptions: AppOptions = {
  rules: {
    page: {
      enabled: true,
      rules: [
        {
          enabled: false,
          key: '新浪微博',
          name: '新浪微博',
          url: 'https://service.weibo.com/share/share.php?url={%url%}&title={%title%}',
        },
        {
          enabled: false,
          key: 'qq空间',
          name: 'qq空间',
          url: 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={%url%}&title={%title%}',
        },
        {
          enabled: false,
          key: '豆瓣',
          name: '豆瓣',
          url: 'https://www.douban.com/recommend/?url={%url%}&name={%title%}',
        },
      ],
    },

    selection: {
      enabled: true,
      rules: [
        {
          enabled: true,
          key: 'Google',
          name: 'Google',
          url: 'https://www.google.com.hk/search?q={%word%}',
        },
        {
          enabled: true,
          key: '百度',
          name: '百度',
          url: 'https://www.baidu.com/s?wd={%word%}&ie=utf-8',
        },
        {
          enabled: true,
          key: 'Bing',
          name: 'Bing',
          url: 'https://www.bing.com/search?q={%word%}',
        },
        {
          enabled: true,
          key: 'DuckDuckGo',
          name: 'DuckDuckGo',
          url: 'https://duckduckgo.com/?q={%word%}',
        },
        {
          enabled: true,
          key: '淘宝',
          name: '淘宝',
          url: 'https://s.taobao.com/search?q={%word%}&ie=utf-8',
        },
        {
          enabled: true,
          key: '百度地图',
          name: '百度地图',
          url: 'https://map.baidu.com/m?word={%word%}&ie=utf-8',
        },
        {
          enabled: true,
          key: '网易云音乐',
          name: '网易云音乐',
          url: 'https://music.163.com/#/search/m/?s={%word%}&type=1',
          whitespaceEncode: '%20',
        },
        {
          enabled: true,
          key: '知乎',
          name: '知乎',
          url: 'https://www.zhihu.com/search?q={%word%}&type=question',
        },
        {
          enabled: true,
          key: '微博',
          name: '微博',
          url: 'https://s.weibo.com/weibo/{%word%}',
        },
        {
          enabled: true,
          key: '百度翻译',
          name: '百度翻译',
          url: 'https://fanyi.baidu.com/#auto/auto/{%word%}',
          whitespaceEncode: '%20',
        },
        {
          enabled: true,
          key: '必应翻译',
          name: '必应翻译',
          url: 'https://cn.bing.com/translator/?text={%word%}',
        },
        {
          enabled: true,
          key: 'Google translate (en)',
          name: 'Google translate (en)',
          url: 'https://translate.google.com/?sl=auto&tl=en-US&text={%word%}&op=translate',
        },
        {
          enabled: true,
          key: 'wikipedia',
          name: 'wikipedia',
          url: 'https://wikipedia.org/wiki/{%word%}',
          whitespaceEncode: '%20',
        },
      ],
    },

    image: {
      enabled: true,
      rules: [
        // outdated
        // {
        //   enabled: true,
        //   key: 'Google 按图搜索',
        //   name: 'Google 按图搜索',
        //   url: 'https://www.google.com.hk/searchbyimage?image_url={%imageUrl%}',
        // },
        // {
        //   enabled: true,
        //   key: 'Yandex 按图搜索',
        //   name: 'Yandex 按图搜索',
        //   url: 'https://yandex.ru/images/search?text={%imageUrl%}&family=yes',
        // },
      ],
    },
  },
};

export default defaultOptions;
