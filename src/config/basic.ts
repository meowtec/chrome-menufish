import { MenuCategory } from '../types/index';

export const groupCategories: MenuCategory[] = [
  'page',
  'selection',
  'image',
  'link',
];

export interface MenuProperties {
  contexts: [
    chrome.contextMenus.ContextType,
    ...chrome.contextMenus.ContextType[],
  ];
  title: string;
  description: string;
}

export const metaProperties: Record<MenuCategory, MenuProperties> = {
  page: {
    contexts: [chrome.contextMenus.ContextType.PAGE],
    title: chrome.i18n.getMessage('actions_on_page'),
    description: chrome.i18n.getMessage('actions_on_page_desc'),
  },

  selection: {
    contexts: [chrome.contextMenus.ContextType.SELECTION],
    title: chrome.i18n.getMessage('actions_on_selection'),
    description: chrome.i18n.getMessage('actions_on_selection_desc'),
  },

  image: {
    contexts: [chrome.contextMenus.ContextType.IMAGE],
    title: chrome.i18n.getMessage('actions_on_image'),
    description: chrome.i18n.getMessage('actions_on_image_desc'),
  },

  link: {
    contexts: [chrome.contextMenus.ContextType.LINK],
    title: chrome.i18n.getMessage('actions_on_link'),
    description: chrome.i18n.getMessage('actions_on_link_desc'),
  },
};
