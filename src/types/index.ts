export type MenuCategory = 'page' | 'selection' | 'image';

export interface MenuRule {
  key: string;
  name: string;
  url: string;
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
