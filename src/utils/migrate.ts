import { AppOptions, AppOptionsRules } from '../types';
import { DeepPartial } from './deep-partial';
import { safeParse } from './json';
import { generateId } from './random';

interface LegacyRule {
  enabled: boolean;
  name: string;
  url: string;
}

export interface LegacyRules {
  share: LegacyRule[];
  search: LegacyRule[];
  imageSearch: LegacyRule[];
}

interface LegacyRulesSwitch {
  search: boolean;
  share: boolean;
  imageSearch: boolean;
}

function readAndParseStorage(key: string) {
  const raw = localStorage.getItem(key);
  if (!raw) return null;

  return safeParse(raw);
}

export function transformLegacyDataToRules(
  rules: DeepPartial<LegacyRules>,
  switchs: DeepPartial<LegacyRulesSwitch>,
): AppOptionsRules {
  const createRulesGroup = (category: keyof LegacyRules) => ({
    enabled: switchs[category] ?? true,
    rules: (rules[category] ?? []).map((item) => ({
      name: item?.name ?? '',
      url: item?.url ?? '',
      enabled: item?.enabled ?? true,
      key: generateId(),
    })),
  });

  return {
    image: createRulesGroup('imageSearch'),
    selection: createRulesGroup('search'),
    page: createRulesGroup('share'),
    link: {
      enabled: true,
      rules: [],
    },
  };
}

export function readOptionsFromLegacyData(): AppOptions | null {
  const rules = readAndParseStorage('rules') as LegacyRules | null;
  const switches = readAndParseStorage('switch') as LegacyRulesSwitch | null;

  if (!rules || !switches) {
    return null;
  }

  return {
    rules: transformLegacyDataToRules(rules, switches),
  };
}

export function clearLegacyData() {
  localStorage.removeItem('rules');
  localStorage.removeItem('switch');
}
