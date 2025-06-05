export type MenuCategory = 'page' | 'selection' | 'image' | 'link';

export const WhitespaceEncode = {
  plus: '+',
  percent: '%20',
} as const;

export type WhitespaceEncode =
  (typeof WhitespaceEncode)[keyof typeof WhitespaceEncode];

export interface MenuRule {
  key: string;
  name: string;
  url: string;
  whitespaceEncode?: WhitespaceEncode;
  enabled: boolean;
}

export interface RulesGroup {
  enabled: boolean;
  rules: MenuRule[];
  title?: string;
}

export type AppOptionsRules = Record<MenuCategory, RulesGroup>;

export type AppOptions = {
  rules: AppOptionsRules;
};

export const DEFAULT_WHITESPACE_ENCODE: WhitespaceEncode =
  WhitespaceEncode.plus;
