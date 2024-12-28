/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import pkg from './package.json' assert { type: 'json' };

/**
 * @type {chrome.runtime.ManifestV3}
 */
export default {
  name: 'Menu fish',
  version: pkg.version,
  manifest_version: 3,
  description:
    '右键菜单增强,为右键添加搜索和分享等功能。支持自定义搜索引擎和分享目标站点',
  icons: {
    16: 'assets/icon-16.png',
    32: 'assets/icon-32.png',
    48: 'assets/icon-48.png',
    128: 'assets/icon-128.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'dist/background.js',
    type: 'module',
  },
  permissions: ['contextMenus', 'storage'],
  homepage_url: 'https://github.com/meowtec/chrome-menufish',
  incognito: 'split',
  default_locale: 'en',
};
