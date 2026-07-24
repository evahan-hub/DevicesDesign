import type {
  RiskProfile,
  RiskRule,
  AutomationConfig,
  ProfileAnalytics,
} from './profile-details.types';

export const PROFILE_TABS = [
  'Profile overview',
  'Risk rules',
  'Automated risk',
];

export const MOCK_PROFILE: RiskProfile = {
  id: 'PRF-001',
  encodedProfileId: 'enc_prf_001',
  profileName: 'Default Action Based',
  profileType: 'Action based',
  merchantName: 'AdyenTechSupport_TEST',
  defaultProfile: true,
  deprecated: false,
  actionBased: true,
  premium: true,
  riskPremium: 'Premium',
  skipReviewOnLiabilityShift: true,
  minimalScoreForReview: null,
  experiment: null,
  createdDate: '2024-06-15',
  lastModifiedDate: '2026-04-01',
  assignedMerchantCodes: 12,
};

export const MOCK_RULES: RiskRule[] = [
  { id: 'R001', name: 'Block card in blocked list', category: 'referral', status: 'enabled', action: 'Block', description: 'Block payment if card number is in the blocked list', lastModified: 'Apr 1, 2026', triggered: 245, blocked: 245 },
  { id: 'R002', name: 'Block email in blocked list', category: 'referral', status: 'enabled', action: 'Block', description: 'Block payment if email is in the blocked list', lastModified: 'Mar 28, 2026', triggered: 182, blocked: 182 },
  { id: 'R003', name: 'Block IP in blocked list', category: 'referral', status: 'enabled', action: 'Block', description: 'Block payment if IP address is in the blocked list', lastModified: 'Mar 15, 2026', triggered: 67, blocked: 67 },
  { id: 'R004', name: 'Review high-value transactions', category: 'custom', status: 'enabled', action: 'Review', score: 50, description: 'Send to case management if transaction value exceeds threshold', lastModified: 'Apr 5, 2026', triggered: 1820, blocked: 0 },
  { id: 'R005', name: 'Block mismatched country', category: 'consistency', status: 'enabled', action: 'Block', description: 'Block if issuer country does not match shopper country', lastModified: 'Mar 20, 2026', triggered: 89, blocked: 89 },
  { id: 'R006', name: 'Velocity check - card', category: 'velocity', status: 'enabled', action: 'Review', description: 'Review if same card used more than 5 times in 1 hour', lastModified: 'Mar 10, 2026', triggered: 312, blocked: 0 },
  { id: 'R007', name: 'Velocity check - email', category: 'velocity', status: 'enabled', action: 'Review', description: 'Review if same email used more than 10 times in 24 hours', lastModified: 'Feb 28, 2026', triggered: 156, blocked: 0 },
  { id: 'R008', name: 'Shopper DNA - new device', category: 'shopperDna', status: 'enabled', action: 'Review', description: 'Review if shopper uses a previously unseen device', lastModified: 'Mar 5, 2026', triggered: 2340, blocked: 0 },
  { id: 'R009', name: 'Shopper DNA - high risk score', category: 'shopperDna', status: 'enabled', action: 'Block', description: 'Block if Shopper DNA risk score exceeds threshold', lastModified: 'Mar 1, 2026', triggered: 45, blocked: 45 },
  { id: 'R010', name: 'Network signal - fraud alert', category: 'networkSignals', status: 'enabled', action: 'Block', description: 'Block if network fraud signal detected', lastModified: 'Apr 8, 2026', triggered: 23, blocked: 23 },
  { id: 'R011', name: 'ML score threshold', category: 'machineLearning', status: 'enabled', action: 'Block', description: 'Block if ML score exceeds blocking threshold', lastModified: 'Apr 2, 2026', triggered: 890, blocked: 890 },
  { id: 'R012', name: 'Trust recurring shopper', category: 'custom', status: 'enabled', action: 'Trust', description: 'Trust payment if shopper has 10+ successful transactions', lastModified: 'Mar 25, 2026', triggered: 15600, blocked: 0 },
  { id: 'R013', name: 'Block TOR exit node', category: 'custom', status: 'disabled', action: 'Block', description: 'Block payments originating from known TOR exit nodes', lastModified: 'Jan 15, 2026', triggered: 0, blocked: 0 },
  { id: 'R014', name: 'Review first-time shopper', category: 'custom', status: 'enabled', action: 'Review', score: 25, description: 'Add score for first-time shoppers without history', lastModified: 'Feb 14, 2026', triggered: 8900, blocked: 0 },
];

export const MOCK_AUTOMATION: AutomationConfig = {
  enabled: true,
  mlScore: 85,
  blockingThreshold: 90,
  reviewThreshold: 60,
  trustThreshold: 20,
  trafficPercentage: 100,
};

export const MOCK_ANALYTICS: ProfileAnalytics = {
  totalTransactions: 245892,
  blockedRate: 2.1,
  reviewRate: 4.8,
  allowedRate: 93.1,
  avgScore: 18.4,
  trend: 'down',
};

export const RULE_CATEGORIES = [
  { key: 'custom', label: 'Custom rules' },
  { key: 'velocity', label: 'Velocity rules' },
  { key: 'referral', label: 'Referral rules' },
  { key: 'consistency', label: 'Consistency rules' },
  { key: 'shopperDna', label: 'Shopper DNA rules' },
  { key: 'machineLearning', label: 'Machine learning' },
  { key: 'networkSignals', label: 'Network signals' },
];

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatRate(rate: number): string {
  return `${rate.toFixed(1)}%`;
}
