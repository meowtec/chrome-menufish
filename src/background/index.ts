import { groupCategories, metaProperties } from '../config/basic';
import { readOptions } from '../services/index';
import {
  MenuRule,
  MenuCategory,
  DEFAULT_WHITESPACE_ENCODE,
} from '../types/index';
import replaceTemplate from '../utils/template';

const { log } = console;

interface Menu {
  id: string;
  parentId?: string;
  title: string;
  contexts: chrome.contextMenus.ContextType[];
  category: MenuCategory;
  rule?: MenuRule;
}

function createApp() {
  let cachedMenus: Menu[] | null = null;

  const createMenusConfig = async (): Promise<Menu[]> => {
    if (cachedMenus) {
      return cachedMenus;
    }

    const options = await readOptions();

    const menus: Menu[] = [];

    groupCategories.forEach((category) => {
      const properties = metaProperties[category];
      const group = options.rules[category];

      if (group.enabled) {
        menus.push({
          id: category,
          title: group.title || properties.title,
          contexts: properties.contexts,
          category,
        });

        group.rules.forEach((rule) => {
          if (!rule.enabled || !rule.name || !rule.url) {
            return;
          }

          menus.push({
            id: rule.key,
            parentId: category,
            title: rule.name,
            contexts: properties.contexts,
            category,
            rule,
          });
        });
      }
    });

    cachedMenus = menus;

    return menus;
  };

  const handleMenuClick = async (
    info: chrome.contextMenus.OnClickData,
    tab?: chrome.tabs.Tab,
  ) => {
    const menus = await createMenusConfig();
    log('menu click', info, tab, menus);
    const menu = menus.find((item) => item.id === info.menuItemId);
    if (!menu || !tab?.url || !menu.rule) return;

    const {
      category,
      rule: { url, whitespaceEncode },
    } = menu;

    let templateData: {
      url?: string;
      title?: string;
      word?: string;
      host?: string;
      imageUrl?: string;
    } = {};

    let s: string | undefined;

    switch (category) {
      case 'page':
        templateData = {
          url: tab.url,
          title: tab.title ?? '',
        };
        s = tab.url;
        break;
      case 'selection':
        templateData = {
          word: info.selectionText ?? '',
          host: new URL(tab.url).host,
        };
        s = info.selectionText;
        break;
      case 'image':
        templateData = {
          imageUrl: info.srcUrl ?? '',
        };
        s = info.srcUrl;
        break;
      case 'link':
        templateData = {
          url: info.linkUrl ?? '',
        };
        s = info.linkUrl;
        break;
      default:
    }

    const openUrl = replaceTemplate(url, templateData, s, {
      whitespaceEncode: whitespaceEncode ?? DEFAULT_WHITESPACE_ENCODE,
    });

    log('open url', openUrl);
    void chrome.tabs.create({
      url: openUrl,
      index: tab.index + 1,
    });
  };

  const loadMenus = async () => {
    const menus = await createMenusConfig();

    chrome.contextMenus.removeAll();

    log('menus', menus);

    menus.forEach((menu) => {
      const { id, parentId, title, contexts } = menu;
      chrome.contextMenus.create({
        id,
        title,
        contexts,
        parentId,
      });
    });
  };

  void loadMenus();

  chrome.runtime.onMessage.addListener((message: { action: string } | null) => {
    if (message && message.action === 'reload') {
      cachedMenus = null;
      void loadMenus();
    }
  });

  chrome.contextMenus.onClicked.addListener(handleMenuClick);
}

createApp();
