import type {
  RiskOverviewData,
  DisputeOverviewData,
  CardMonitoringProgram,
  BlockedByRiskData,
  AllowedByRiskData,
  RefundActivityData,
  RiskBreakdownRow,
} from './risk-dispute-management.types';

export const TABS = [
  'Overview',
  'Allowed by risk',
  'Blocked by risk',
  'Card monitoring programs',
  'Disputes',
  'Refund activity',
];

const riskBreakdown: RiskBreakdownRow[] = [
  { dimension: 'Visa', amount: 1250000, count: 5200, rate: 2.1, currency: 'EUR' },
  { dimension: 'Mastercard', amount: 980000, count: 4100, rate: 1.9, currency: 'EUR' },
  { dimension: 'Amex', amount: 320000, count: 850, rate: 3.2, currency: 'EUR' },
  { dimension: 'PayPal', amount: 180000, count: 920, rate: 0.8, currency: 'EUR' },
  { dimension: 'iDEAL', amount: 45000, count: 210, rate: 0.3, currency: 'EUR' },
  { dimension: 'Klarna', amount: 62000, count: 340, rate: 0.5, currency: 'EUR' },
];

export const MOCK_RISK_OVERVIEW: RiskOverviewData = {
  totalReceived: { amount: 13200000, count: 58000 },
  blockedByRisk: { amount: 420000, count: 1850 },
  refusedByIssuer: { amount: 520000, count: 3900 },
  chargebacks: { amount: 145000, count: 320 },
  fraudChargebacks: { amount: 98000, count: 210 },
  nonFraudChargebacks: { amount: 47000, count: 110 },
  nofs: { amount: 62000, count: 85 },
};

export const MOCK_DISPUTES: DisputeOverviewData = {
  totalDisputes: { amount: 207000, count: 405 },
  openDisputes: { amount: 45000, count: 82 },
  wonDisputes: { amount: 38000, count: 95 },
  lostDisputes: { amount: 124000, count: 228 },
  chargebackRate: 0.59,
  breakdown: [
    { dimension: 'Fraud', amount: 98000, count: 210, rate: 51.9, currency: 'EUR' },
    { dimension: 'Product not received', amount: 42000, count: 85, rate: 21.0, currency: 'EUR' },
    { dimension: 'Product not as described', amount: 28000, count: 52, rate: 12.8, currency: 'EUR' },
    { dimension: 'Duplicate processing', amount: 18000, count: 30, rate: 7.4, currency: 'EUR' },
    { dimension: 'Subscription cancelled', amount: 12000, count: 18, rate: 4.4, currency: 'EUR' },
    { dimension: 'Other', amount: 9000, count: 10, rate: 2.5, currency: 'EUR' },
  ],
};

export const MOCK_CARD_MONITORING: CardMonitoringProgram[] = [
  {
    scheme: 'Visa',
    program: 'Visa Dispute Monitoring Program (Standard)',
    status: 'safe',
    currentMonth: { rate: 0.52, count: 85, threshold: 0.9 },
    previousMonth: { rate: 0.48, count: 78, threshold: 0.9 },
  },
  {
    scheme: 'Visa',
    program: 'Visa Fraud Monitoring Program (Standard)',
    status: 'safe',
    currentMonth: { rate: 0.38, count: 62, threshold: 0.65 },
    previousMonth: { rate: 0.41, count: 68, threshold: 0.65 },
  },
  {
    scheme: 'Mastercard',
    program: 'Excessive Chargeback Merchant',
    status: 'warning',
    currentMonth: { rate: 1.2, count: 110, threshold: 1.5 },
    previousMonth: { rate: 0.95, count: 92, threshold: 1.5 },
  },
  {
    scheme: 'Mastercard',
    program: 'Excessive Fraud Merchant',
    status: 'safe',
    currentMonth: { rate: 0.28, count: 45, threshold: 0.5 },
    previousMonth: { rate: 0.31, count: 50, threshold: 0.5 },
  },
];

export const MOCK_BLOCKED_BY_RISK: BlockedByRiskData = {
  totalBlocked: { amount: 420000, count: 1850 },
  blockedPreAuth: { amount: 310000, count: 1380 },
  blockedPostAuth: { amount: 110000, count: 470 },
  breakdown: riskBreakdown.map(r => ({ ...r, rate: r.rate! + 1.5 })),
};

export const MOCK_ALLOWED_BY_RISK: AllowedByRiskData = {
  totalAllowed: { amount: 12780000, count: 56150 },
  chargebacksFromAllowed: { amount: 145000, count: 320 },
  fraudRate: 0.57,
  breakdown: riskBreakdown,
};

export const MOCK_REFUND_ACTIVITY: RefundActivityData = {
  totalRefunds: { amount: 890000, count: 4200 },
  refundRate: 7.5,
  breakdown: [
    { dimension: 'Customer request', amount: 420000, count: 1980, rate: 47.1, currency: 'EUR' },
    { dimension: 'Fraud prevention', amount: 180000, count: 850, rate: 20.2, currency: 'EUR' },
    { dimension: 'Chargeback defense', amount: 145000, count: 680, rate: 16.2, currency: 'EUR' },
    { dimension: 'Product return', amount: 95000, count: 450, rate: 10.7, currency: 'EUR' },
    { dimension: 'Other', amount: 50000, count: 240, rate: 5.7, currency: 'EUR' },
  ],
};

export function formatAmount(minorUnits: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(minorUnits / 100);
}

export function formatCount(count: number): string {
  return new Intl.NumberFormat('en-US').format(count);
}

export function formatRate(rate: number): string {
  return `${rate.toFixed(2)}%`;
}
