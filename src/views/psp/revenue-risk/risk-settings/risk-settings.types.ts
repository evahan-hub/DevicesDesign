export interface RiskSetting {
  id: string;
  key: string;
  label: string;
  description: string;
  category: SettingCategory;
  type: 'toggle' | 'select' | 'input' | 'multi-select';
  value: unknown;
  options?: { label: string; value: string }[];
}

export type SettingCategory =
  | 'general'
  | 'caseManagement'
  | 'velocityChecks'
  | 'referralChecks'
  | 'consistencyChecks'
  | 'shopperDna';

export interface ShopperDnaLinkingConfig {
  region: string;
  enabled: boolean;
  merchantAccounts: string[];
}

export enum SettingsTab {
  RISK_SETTINGS = 0,
  SHOPPER_DNA = 1,
}
