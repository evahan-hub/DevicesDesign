export interface RiskSummaryItem {
  title: string;
  value: string;
  trend?: string;
  trendDirection?: 'positive' | 'negative' | 'neutral';
}

export interface RiskBreakdownRow {
  [key: string]: unknown;
  dimension: string;
  amount: number;
  count: number;
  rate?: number;
  currency: string;
}

export interface RiskOverviewData {
  totalReceived: { amount: number; count: number };
  blockedByRisk: { amount: number; count: number };
  refusedByIssuer: { amount: number; count: number };
  chargebacks: { amount: number; count: number };
  fraudChargebacks: { amount: number; count: number };
  nonFraudChargebacks: { amount: number; count: number };
  nofs: { amount: number; count: number };
}

export interface DisputeOverviewData {
  totalDisputes: { amount: number; count: number };
  openDisputes: { amount: number; count: number };
  wonDisputes: { amount: number; count: number };
  lostDisputes: { amount: number; count: number };
  chargebackRate: number;
  breakdown: RiskBreakdownRow[];
}

export interface CardMonitoringProgram {
  [key: string]: unknown;
  scheme: string;
  program: string;
  status: 'safe' | 'warning' | 'breach';
  currentMonth: { rate: number; count: number; threshold: number };
  previousMonth: { rate: number; count: number; threshold: number };
}

export interface BlockedByRiskData {
  totalBlocked: { amount: number; count: number };
  blockedPreAuth: { amount: number; count: number };
  blockedPostAuth: { amount: number; count: number };
  breakdown: RiskBreakdownRow[];
}

export interface AllowedByRiskData {
  totalAllowed: { amount: number; count: number };
  chargebacksFromAllowed: { amount: number; count: number };
  fraudRate: number;
  breakdown: RiskBreakdownRow[];
}

export interface RefundActivityData {
  totalRefunds: { amount: number; count: number };
  refundRate: number;
  breakdown: RiskBreakdownRow[];
}

export enum RiskDisputeTab {
  OVERVIEW = 0,
  ALLOWED_BY_RISK = 1,
  BLOCKED_BY_RISK = 2,
  CARD_MONITORING = 3,
  DISPUTES = 4,
  REFUND_ACTIVITY = 5,
}
