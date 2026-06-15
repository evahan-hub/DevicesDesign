import type { Experiment } from './experiments.types';

export const EXPERIMENT_TABS = ['Active', 'Completed', 'Drafts'];

export const MOCK_EXPERIMENTS: Experiment[] = [
  { id: 'EXP001', name: 'ML threshold optimization', profileName: 'Default Action Based', status: 'running', startDate: 'Mar 15, 2026', endDate: null, trafficSplit: 50, metrics: { transactionCount: 45200, blockRate: 1.8, blockRateControl: 2.1, falsePositiveRate: 0.02, falsePositiveRateControl: 0.03, uplift: 14.3 } },
  { id: 'EXP002', name: 'Velocity check tuning', profileName: 'High-Value Transactions', status: 'running', startDate: 'Apr 1, 2026', endDate: null, trafficSplit: 30, metrics: { transactionCount: 12800, blockRate: 3.2, blockRateControl: 3.5, falsePositiveRate: 0.05, falsePositiveRateControl: 0.04, uplift: 8.6 } },
  { id: 'EXP003', name: 'New referral rules test', profileName: 'Low-Risk Markets', status: 'paused', startDate: 'Feb 20, 2026', endDate: null, trafficSplit: 20, metrics: { transactionCount: 8900, blockRate: 0.9, blockRateControl: 1.1, falsePositiveRate: 0.01, falsePositiveRateControl: 0.02, uplift: 18.2 } },
  { id: 'EXP004', name: 'Shopper DNA v2 rollout', profileName: 'Default Action Based', status: 'completed', startDate: 'Jan 5, 2026', endDate: 'Mar 1, 2026', trafficSplit: 50, metrics: { transactionCount: 234000, blockRate: 1.5, blockRateControl: 2.0, falsePositiveRate: 0.01, falsePositiveRateControl: 0.03, uplift: 25.0 } },
  { id: 'EXP005', name: 'Blocking threshold A/B', profileName: 'Default Action Based', status: 'completed', startDate: 'Dec 10, 2025', endDate: 'Feb 15, 2026', trafficSplit: 50, metrics: { transactionCount: 189000, blockRate: 1.9, blockRateControl: 2.2, falsePositiveRate: 0.02, falsePositiveRateControl: 0.04, uplift: 13.6 } },
  { id: 'EXP006', name: 'New consistency rules', profileName: 'MOTO Transactions', status: 'draft', startDate: '', endDate: null, trafficSplit: 50, metrics: { transactionCount: 0, blockRate: 0, blockRateControl: 0, falsePositiveRate: 0, falsePositiveRateControl: 0, uplift: 0 } },
];
