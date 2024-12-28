import { MenuCategory } from '../types/index';

export const groupCategories: MenuCategory[] = ['page', 'selection', 'image'];

export interface MenuProperties {
  contexts: chrome.contextMenus.ContextType[];
  title: string;
  description: string;
}

export const metaProperties: Record<MenuCategory, MenuProperties> = {
  page: {
    contexts: ['page'],
    title: chrome.i18n.getMessage('actions_on_page'),
    description: chrome.i18n.getMessage('actions_on_page_desc'),
  },

  selection: {
    contexts: ['selection'],
    title: chrome.i18n.getMessage('actions_on_selection'),
    description: chrome.i18n.getMessage('actions_on_selection_desc'),
  },

  image: {
    contexts: ['image'],
    title: chrome.i18n.getMessage('actions_on_image'),
    description: chrome.i18n.getMessage('actions_on_image_desc'),
  },
};
