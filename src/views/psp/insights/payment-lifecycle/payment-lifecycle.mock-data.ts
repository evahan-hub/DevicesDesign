import type {
  FullFunnelData,
  AuthorisedRefusedData,
  AuthenticationData,
  PurchasesRefundsData,
  ChargebacksData,
  SettlementsFeesData,
  BreakdownRow,
  ChartDataPoint,
} from './payment-lifecycle.types';

export const TABS = [
  'Overview',
  'Authentication & drop-off',
  'Authorised & refused',
  'Purchases & refunds',
  'Chargebacks & NOFs',
  'Settlements & fees',
];

export const MOCK_DATE_RANGE = {
  startDate: '2026-03-11',
  endDate: '2026-04-09',
  label: 'Mar 11 – Apr 9, 2026',
};

const paymentMethodBreakdown: BreakdownRow[] = [
  { dimension: 'Visa', amount: 4250000, count: 18420, rate: 96.2, trend: 0.8, currency: 'EUR' },
  { dimension: 'Mastercard', amount: 3180000, count: 14200, rate: 95.1, trend: -0.3, currency: 'EUR' },
  { dimension: 'iDEAL', amount: 1890000, count: 9800, rate: 99.8, trend: 0.1, currency: 'EUR' },
  { dimension: 'Amex', amount: 980000, count: 2100, rate: 93.4, trend: 1.2, currency: 'EUR' },
  { dimension: 'Klarna', amount: 620000, count: 3400, rate: 97.5, trend: 0.5, currency: 'EUR' },
  { dimension: 'PayPal', amount: 540000, count: 4800, rate: 98.1, trend: -0.2, currency: 'EUR' },
  { dimension: 'Apple Pay', amount: 410000, count: 3200, rate: 97.8, trend: 2.1, currency: 'EUR' },
  { dimension: 'Google Pay', amount: 280000, count: 2100, rate: 96.9, trend: 1.5, currency: 'EUR' },
];

const refusalBreakdown: BreakdownRow[] = [
  { dimension: 'Refused', amount: 180000, count: 1200, rate: 35.2, currency: 'EUR' },
  { dimension: 'Not enough balance', amount: 120000, count: 980, rate: 23.5, currency: 'EUR' },
  { dimension: 'Blocked card', amount: 85000, count: 640, rate: 15.3, currency: 'EUR' },
  { dimension: 'Expired card', amount: 52000, count: 420, rate: 10.1, currency: 'EUR' },
  { dimension: 'CVC declined', amount: 38000, count: 310, rate: 7.4, currency: 'EUR' },
  { dimension: 'Issuer unavailable', amount: 24000, count: 180, rate: 4.3, currency: 'EUR' },
  { dimension: 'Fraud', amount: 12000, count: 95, rate: 2.3, currency: 'EUR' },
  { dimension: 'Other', amount: 9000, count: 75, rate: 1.8, currency: 'EUR' },
];

export const MOCK_CHART_DATA: ChartDataPoint[] = [
  { label: 'Mar 11', value: 95.2, comparisonValue: 94.1 },
  { label: 'Mar 12', value: 95.8, comparisonValue: 94.5 },
  { label: 'Mar 13', value: 94.9, comparisonValue: 93.8 },
  { label: 'Mar 14', value: 96.1, comparisonValue: 95.0 },
  { label: 'Mar 15', value: 95.5, comparisonValue: 94.8 },
  { label: 'Mar 16', value: 93.2, comparisonValue: 92.5 },
  { label: 'Mar 17', value: 92.8, comparisonValue: 93.1 },
  { label: 'Mar 18', value: 95.4, comparisonValue: 94.2 },
  { label: 'Mar 19', value: 96.0, comparisonValue: 95.1 },
  { label: 'Mar 20', value: 95.7, comparisonValue: 94.6 },
  { label: 'Mar 21', value: 96.3, comparisonValue: 95.5 },
  { label: 'Mar 22', value: 95.9, comparisonValue: 94.9 },
  { label: 'Mar 23', value: 93.5, comparisonValue: 93.0 },
  { label: 'Mar 24', value: 92.1, comparisonValue: 92.8 },
  { label: 'Mar 25', value: 95.6, comparisonValue: 94.4 },
];

export const MOCK_FULL_FUNNEL: FullFunnelData = {
  initiated: { amount: 14500000, count: 62000 },
  received: { amount: 13200000, count: 58000 },
  authenticationOnly: { amount: 12800000, count: 56200 },
  authorised: { amount: 12150000, count: 54020 },
  grossSettlement: { amount: 11800000, count: 52000 },
  netSettlement: { amount: 11200000, count: 51200 },
};

export const MOCK_AUTHENTICATION: AuthenticationData = {
  conversionRate: 96.9,
  dropoffRate: 3.1,
  initiated: { amount: 13200000, count: 58000 },
  successfulAuthentications: { amount: 12800000, count: 56200 },
  failedAuthentications: { amount: 400000, count: 1800 },
  breakdown: paymentMethodBreakdown.map(row => ({
    ...row,
    rate: row.rate! - 1.5 + Math.random() * 3,
  })),
};

export const MOCK_AUTHORISED_REFUSED: AuthorisedRefusedData = {
  authorisationRate: 96.2,
  totalReceived: { amount: 13200000, count: 58000 },
  totalAuthorised: { amount: 12150000, count: 54020 },
  totalRefused: { amount: 520000, count: 3900 },
  atv: 22500,
  breakdown: paymentMethodBreakdown,
  refusalBreakdown,
};

export const MOCK_PURCHASES_REFUNDS: PurchasesRefundsData = {
  totalSales: { amount: 11800000, count: 52000 },
  totalRefunds: { amount: 890000, count: 4200 },
  referencedRefunds: { amount: 720000, count: 3500 },
  atv: 22692,
  breakdown: paymentMethodBreakdown.map(row => ({
    ...row,
    rate: undefined,
    trend: row.trend! + (Math.random() * 2 - 1),
  })),
};

export const MOCK_CHARGEBACKS: ChargebacksData = {
  totalChargebacks: { amount: 145000, count: 320 },
  totalNofs: { amount: 62000, count: 85 },
  chargebackRate: 0.59,
  nofRate: 0.16,
  chargebackBreakdown: [
    { dimension: 'Visa', amount: 72000, count: 160, rate: 0.87, currency: 'EUR' },
    { dimension: 'Mastercard', amount: 48000, count: 110, rate: 0.77, currency: 'EUR' },
    { dimension: 'Amex', amount: 15000, count: 30, rate: 1.43, currency: 'EUR' },
    { dimension: 'PayPal', amount: 6000, count: 12, rate: 0.25, currency: 'EUR' },
    { dimension: 'Klarna', amount: 4000, count: 8, rate: 0.24, currency: 'EUR' },
  ],
  nofBreakdown: [
    { dimension: 'Visa', amount: 35000, count: 48, rate: 0.26, currency: 'EUR' },
    { dimension: 'Mastercard', amount: 22000, count: 30, rate: 0.21, currency: 'EUR' },
    { dimension: 'Amex', amount: 5000, count: 7, rate: 0.33, currency: 'EUR' },
  ],
};

export const MOCK_SETTLEMENTS_FEES: SettlementsFeesData = {
  grossSettlement: { amount: 11800000, count: 52000 },
  netSettlement: { amount: 11200000, count: 51200 },
  totalFees: { amount: 600000, count: 52000 },
  interchange: { amount: 320000, count: 52000 },
  schemeFees: { amount: 180000, count: 52000 },
  otherFees: { amount: 100000, count: 52000 },
  settlementsBreakdown: paymentMethodBreakdown.map(row => ({
    ...row,
    rate: undefined,
  })),
  feesBreakdown: [
    { dimension: 'Visa', amount: 210000, count: 18420, currency: 'EUR' },
    { dimension: 'Mastercard', amount: 185000, count: 14200, currency: 'EUR' },
    { dimension: 'iDEAL', amount: 49000, count: 9800, currency: 'EUR' },
    { dimension: 'Amex', amount: 68000, count: 2100, currency: 'EUR' },
    { dimension: 'Klarna', amount: 37000, count: 3400, currency: 'EUR' },
    { dimension: 'PayPal', amount: 28000, count: 4800, currency: 'EUR' },
    { dimension: 'Apple Pay', amount: 15000, count: 3200, currency: 'EUR' },
    { dimension: 'Google Pay', amount: 8000, count: 2100, currency: 'EUR' },
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
  return `${rate.toFixed(1)}%`;
}
