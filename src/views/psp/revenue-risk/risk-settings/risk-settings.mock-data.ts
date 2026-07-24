import type { RiskSetting, ShopperDnaLinkingConfig } from './risk-settings.types';

export const SETTINGS_TABS = ['Risk settings', 'Shopper DNA linking'];

export const MOCK_SETTINGS: RiskSetting[] = [
  { id: 'S001', key: 'enableManualReview', label: 'Enable manual review', description: 'Allow transactions to be sent to case management for manual review', category: 'caseManagement', type: 'toggle', value: true },
  { id: 'S002', key: 'autoAcceptDelay', label: 'Auto-accept delay', description: 'Automatically accept cases after this number of hours if no action is taken', category: 'caseManagement', type: 'select', value: '48', options: [{ label: '12 hours', value: '12' }, { label: '24 hours', value: '24' }, { label: '48 hours', value: '48' }, { label: '72 hours', value: '72' }, { label: 'Never', value: 'never' }] },
  { id: 'S003', key: 'maxCasesPerUser', label: 'Max cases per reviewer', description: 'Maximum number of cases that can be assigned to a single reviewer', category: 'caseManagement', type: 'input', value: '50' },
  { id: 'S004', key: 'enableVelocityChecks', label: 'Enable velocity checks', description: 'Check for repeated transaction attempts within a time window', category: 'velocityChecks', type: 'toggle', value: true },
  { id: 'S005', key: 'velocityWindow', label: 'Velocity time window', description: 'Time window for velocity check calculations', category: 'velocityChecks', type: 'select', value: '1h', options: [{ label: '15 minutes', value: '15m' }, { label: '1 hour', value: '1h' }, { label: '6 hours', value: '6h' }, { label: '24 hours', value: '24h' }] },
  { id: 'S006', key: 'enableReferralChecks', label: 'Enable referral checks', description: 'Check transactions against blocked/trusted lists', category: 'referralChecks', type: 'toggle', value: true },
  { id: 'S007', key: 'referralListScope', label: 'Referral list scope', description: 'Scope of referral list checks', category: 'referralChecks', type: 'select', value: 'company', options: [{ label: 'Company level', value: 'company' }, { label: 'Merchant level', value: 'merchant' }, { label: 'Both', value: 'both' }] },
  { id: 'S008', key: 'enableConsistencyChecks', label: 'Enable consistency checks', description: 'Check for inconsistencies in transaction data (e.g., country mismatch)', category: 'consistencyChecks', type: 'toggle', value: true },
  { id: 'S009', key: 'enableShopperDna', label: 'Enable Shopper DNA', description: 'Use device fingerprinting and behavioral analytics for risk assessment', category: 'shopperDna', type: 'toggle', value: true },
  { id: 'S010', key: 'shopperDnaDataRegion', label: 'Data region', description: 'Region where Shopper DNA data is stored and processed', category: 'shopperDna', type: 'select', value: 'eu', options: [{ label: 'European Union', value: 'eu' }, { label: 'United States', value: 'us' }, { label: 'Australia', value: 'au' }] },
];

export const MOCK_SHOPPER_DNA_LINKING: ShopperDnaLinkingConfig[] = [
  { region: 'European Union', enabled: true, merchantAccounts: ['AdyenTechSupport_LIVE_NL', 'AdyenTechSupport_LIVE_DE', 'AdyenTechSupport_LIVE_FR', 'AdyenTechSupport_LIVE_GB'] },
  { region: 'United States', enabled: true, merchantAccounts: ['AdyenTechSupport_LIVE_US'] },
  { region: 'Australia', enabled: false, merchantAccounts: [] },
];

export const SETTING_CATEGORIES = [
  { key: 'caseManagement', label: 'Case management' },
  { key: 'velocityChecks', label: 'Velocity checks' },
  { key: 'referralChecks', label: 'Referral checks' },
  { key: 'consistencyChecks', label: 'Consistency checks' },
  { key: 'shopperDna', label: 'Shopper DNA' },
];
