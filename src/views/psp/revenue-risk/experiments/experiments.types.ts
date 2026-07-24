export interface Experiment {
  id: string;
  name: string;
  profileName: string;
  status: ExperimentStatus;
  startDate: string;
  endDate: string | null;
  trafficSplit: number;
  metrics: ExperimentMetrics;
}

export type ExperimentStatus = 'running' | 'completed' | 'draft' | 'paused';

export interface ExperimentMetrics {
  transactionCount: number;
  blockRate: number;
  blockRateControl: number;
  falsePositiveRate: number;
  falsePositiveRateControl: number;
  uplift: number;
}
