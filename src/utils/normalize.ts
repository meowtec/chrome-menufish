import defaultOptions from '../config/default-options';
import { AppOptions, AppOptionsRules, RulesGroup } from '../types';
import { removeNulls } from './array';
import { DeepPartial } from './deep-partial';
import { generateId } from './random';

function normalizeRulesGroup(
  group: DeepPartial<RulesGroup> | null | undefined,
): RulesGroup {
  return {
    enabled: group?.enabled ?? true,
    title: group?.title,
    rules: removeNulls(group?.rules ?? []).map((item) => ({
      ...item,
      key: item.key ?? generateId(),
      name: item.name ?? '',
      url: item.url ?? '',
      enabled: item.enabled ?? true,
    })),
  };
}

export function normalizeRules(
  rules: DeepPartial<AppOptionsRules>,
): AppOptionsRules {
  return {
    page: normalizeRulesGroup(rules.page),
    selection: normalizeRulesGroup(rules.selection),
    image: normalizeRulesGroup(rules.image),
  };
}

export function normalizeOptions(
  options: DeepPartial<AppOptions> | undefined,
): AppOptions {
  if (!options) {
    return defaultOptions;
  }

  return {
    ...options,
    rules: options.rules ? normalizeRules(options.rules) : defaultOptions.rules,
  };
}
