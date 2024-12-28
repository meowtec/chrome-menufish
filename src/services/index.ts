import defaultOptions from '../config/default-options';
import { AppOptions } from '../types/index';
import { normalizeOptions } from '../utils/normalize';

async function getStorage(key: string) {
  const data = await chrome.storage.sync.get([key]);
  return data[key] as unknown;
}

export function saveOptions(options: AppOptions) {
  return chrome.storage.sync.set({ options });
}

export async function readOptions(): Promise<AppOptions> {
  const options = await getStorage('options');

  if (!options) {
    return defaultOptions;
  }

  const normalizedOptions = normalizeOptions(options);

  saveOptions(normalizedOptions);

  return normalizedOptions;
}

export function callMenuReload() {
  chrome.runtime.sendMessage({
    action: 'reload',
  });
}
