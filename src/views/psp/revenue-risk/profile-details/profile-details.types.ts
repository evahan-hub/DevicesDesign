export interface RiskProfile {
  id: string;
  encodedProfileId: string;
  profileName: string;
  profileType: 'Score based' | 'Action based';
  merchantName: string;
  defaultProfile: boolean;
  deprecated: boolean;
  actionBased: boolean;
  premium: boolean;
  riskPremium: string;
  skipReviewOnLiabilityShift: boolean;
  minimalScoreForReview: number | null;
  experiment: string | null;
  createdDate: string;
  lastModifiedDate: string;
  assignedMerchantCodes: number;
}

export interface RiskRule {
  [key: string]: unknown;
  id: string;
  name: string;
  category: RuleCategory;
  status: 'enabled' | 'disabled';
  action: RuleAction;
  score?: number;
  description: string;
  lastModified: string;
  triggered?: number;
  blocked?: number;
}

export type RuleCategory =
  | 'custom'
  | 'velocity'
  | 'referral'
  | 'consistency'
  | 'shopperDna'
  | 'machineLearning'
  | 'networkSignals';

export type RuleAction = 'Allow' | 'Block' | 'Review' | 'Trust' | 'Score only';

export interface AutomationConfig {
  enabled: boolean;
  mlScore: number;
  blockingThreshold: number;
  reviewThreshold: number;
  trustThreshold: number;
  trafficPercentage: number;
}

export interface ProfileOverviewItem {
  label: string;
  value: string;
}

export interface ProfileAnalytics {
  totalTransactions: number;
  blockedRate: number;
  reviewRate: number;
  allowedRate: number;
  avgScore: number;
  trend: 'up' | 'down' | 'neutral';
}

export enum ProfileTab {
  OVERVIEW = 0,
  RISK_RULES = 1,
  AUTOMATED_RISK = 2,
}
