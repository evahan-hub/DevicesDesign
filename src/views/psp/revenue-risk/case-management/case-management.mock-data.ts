import type { CaseItem } from './case-management.types';

export const CASE_TABS = ['Open cases (48)', 'My cases (12)', 'Closed cases'];

export const MOCK_USERS = [
  { key: 'user1', name: 'Alice van den Berg' },
  { key: 'user2', name: 'Bob Jansen' },
  { key: 'user3', name: 'Claire Dubois' },
  { key: 'user4', name: 'David Schmidt' },
];

export const MOCK_CASES: CaseItem[] = [
  { id: 'C001', pspReference: 'MXGF8K2T6VH9QRJL', merchantReference: 'order_28491', merchantAccount: 'AdyenTechSupport_TEST', amount: { value: 125000, currency: 'EUR' }, paymentMethod: 'visa', shopperEmail: 'john.d@example.com', shopperCountry: 'NL', riskScore: 82, status: 'open', assignee: null, creationDate: 'Apr 10, 2026, 14:22', lastEvent: 'ManualReview', tags: ['high-value'] },
  { id: 'C002', pspReference: 'NK3P7L9W2BZ5MXFC', merchantReference: 'order_28492', merchantAccount: 'AdyenTechSupport_TEST', amount: { value: 89900, currency: 'EUR' }, paymentMethod: 'mastercard', shopperEmail: 'sarah.m@example.com', shopperCountry: 'DE', riskScore: 75, status: 'open', assignee: null, creationDate: 'Apr 10, 2026, 13:45', lastEvent: 'ManualReview', tags: [] },
  { id: 'C003', pspReference: 'QR8T5N1Y7GHJK4DP', merchantReference: 'order_28493', merchantAccount: 'AdyenTechSupport_LIVE_NL', amount: { value: 234500, currency: 'EUR' }, paymentMethod: 'visa', shopperEmail: 'mike.w@example.com', shopperCountry: 'US', riskScore: 91, status: 'open', assignee: null, creationDate: 'Apr 10, 2026, 12:30', lastEvent: 'ManualReview', tags: ['velocity', 'high-value'] },
  { id: 'C004', pspReference: 'VB2C6F9H3LMNSW8X', merchantReference: 'order_28494', merchantAccount: 'AdyenTechSupport_TEST', amount: { value: 4500, currency: 'EUR' }, paymentMethod: 'ideal', shopperEmail: 'emma.k@example.com', shopperCountry: 'NL', riskScore: 65, status: 'open', assignee: null, creationDate: 'Apr 10, 2026, 11:15', lastEvent: 'ManualReview', tags: [] },
  { id: 'C005', pspReference: 'WZ7Y4K1D9RTPXG5M', merchantReference: 'order_28495', merchantAccount: 'AdyenTechSupport_LIVE_DE', amount: { value: 67800, currency: 'EUR' }, paymentMethod: 'amex', shopperEmail: 'thomas.b@example.com', shopperCountry: 'GB', riskScore: 78, status: 'open', assignee: null, creationDate: 'Apr 10, 2026, 10:00', lastEvent: 'ManualReview', tags: ['new-shopper'] },
  { id: 'C006', pspReference: 'AH6L3Q8F2NBJCX9V', merchantReference: 'order_28496', merchantAccount: 'AdyenTechSupport_TEST', amount: { value: 15600, currency: 'EUR' }, paymentMethod: 'visa', shopperEmail: 'lisa.r@example.com', shopperCountry: 'FR', riskScore: 70, status: 'in_review', assignee: 'Alice van den Berg', creationDate: 'Apr 9, 2026, 16:30', lastEvent: 'InvestigateStarted', tags: [] },
  { id: 'C007', pspReference: 'DP4W7M1K5GHRZT8Y', merchantReference: 'order_28497', merchantAccount: 'AdyenTechSupport_LIVE_NL', amount: { value: 345000, currency: 'EUR' }, paymentMethod: 'visa', shopperEmail: 'peter.s@example.com', shopperCountry: 'BE', riskScore: 88, status: 'in_review', assignee: 'Alice van den Berg', creationDate: 'Apr 9, 2026, 15:45', lastEvent: 'InvestigateStarted', tags: ['high-value', 'velocity'] },
  { id: 'C008', pspReference: 'FN9X2B6T3PLWMV4G', merchantReference: 'order_28498', merchantAccount: 'AdyenTechSupport_TEST', amount: { value: 8900, currency: 'EUR' }, paymentMethod: 'mastercard', shopperEmail: 'anna.j@example.com', shopperCountry: 'NL', riskScore: 62, status: 'in_review', assignee: 'Bob Jansen', creationDate: 'Apr 9, 2026, 14:20', lastEvent: 'InvestigateStarted', tags: [] },
  { id: 'C009', pspReference: 'KT5H8R3C7YDWXL1N', merchantReference: 'order_28499', merchantAccount: 'AdyenTechSupport_LIVE_US', amount: { value: 52000, currency: 'USD' }, paymentMethod: 'visa', shopperEmail: 'james.w@example.com', shopperCountry: 'US', riskScore: 73, status: 'accepted', assignee: 'Claire Dubois', creationDate: 'Apr 8, 2026, 10:10', lastEvent: 'Accepted', tags: [] },
  { id: 'C010', pspReference: 'BM1V6N4J9FQPWX3L', merchantReference: 'order_28500', merchantAccount: 'AdyenTechSupport_TEST', amount: { value: 198000, currency: 'EUR' }, paymentMethod: 'amex', shopperEmail: 'karen.l@example.com', shopperCountry: 'US', riskScore: 95, status: 'rejected', assignee: 'Alice van den Berg', creationDate: 'Apr 7, 2026, 09:00', lastEvent: 'Rejected', tags: ['high-value', 'fraud-signal'] },
  { id: 'C011', pspReference: 'GR8D2P5K1WXNHM7Y', merchantReference: 'order_28501', merchantAccount: 'AdyenTechSupport_LIVE_NL', amount: { value: 23400, currency: 'EUR' }, paymentMethod: 'bancontact', shopperEmail: 'marc.v@example.com', shopperCountry: 'BE', riskScore: 58, status: 'expired', assignee: null, creationDate: 'Apr 3, 2026, 11:30', lastEvent: 'Expired', tags: [] },
  { id: 'C012', pspReference: 'JL4F9T3B7QHCNX6W', merchantReference: 'order_28502', merchantAccount: 'AdyenTechSupport_TEST', amount: { value: 78000, currency: 'EUR' }, paymentMethod: 'visa', shopperEmail: 'sophie.d@example.com', shopperCountry: 'NL', riskScore: 81, status: 'open', assignee: null, creationDate: 'Apr 10, 2026, 09:45', lastEvent: 'ManualReview', tags: ['new-shopper'] },
];

export function formatAmount(minorUnits: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(minorUnits / 100);
}

export function formatScore(score: number): string {
  return score.toString();
}
