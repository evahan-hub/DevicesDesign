export type ViewBy = 'amount' | 'count';

export interface AmountCount {
  amount: number;
  count: number;
}

export interface SummaryItem {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'positive' | 'negative' | 'neutral';
}

export interface BreakdownRow {
  [key: string]: unknown;
  dimension: string;
  amount: number;
  count: number;
  rate?: number;
  trend?: number;
  currency: string;
}

export interface OverviewKPI {
  title: string;
  value: string;
  subtitle?: string;
  trend?: string;
  trendDirection?: 'positive' | 'negative' | 'neutral';
}

export interface ChartDataPoint {
  label: string;
  value: number;
  comparisonValue?: number;
}

export interface SettlementByDateRange {
  initiatedBeforeDateRange: AmountCount;
  initiatedInDateRange: AmountCount;
}

export interface FullFunnelData {
  initiated: AmountCount;
  received: AmountCount;
  authenticationOnly: AmountCount;
  authorised: AmountCount;
  grossSettlement: AmountCount;
  netSettlement: AmountCount;
}

export interface AuthorisedRefusedData {
  authorisationRate: number;
  totalReceived: AmountCount;
  totalAuthorised: AmountCount;
  totalRefused: AmountCount;
  atv: number;
  breakdown: BreakdownRow[];
  refusalBreakdown: BreakdownRow[];
}

export interface AuthenticationData {
  conversionRate: number;
  dropoffRate: number;
  initiated: AmountCount;
  successfulAuthentications: AmountCount;
  failedAuthentications: AmountCount;
  breakdown: BreakdownRow[];
}

export interface PurchasesRefundsData {
  totalSales: AmountCount;
  totalRefunds: AmountCount;
  referencedRefunds: AmountCount;
  atv: number;
  breakdown: BreakdownRow[];
}

export interface ChargebacksData {
  totalChargebacks: AmountCount;
  totalNofs: AmountCount;
  chargebackRate: number;
  nofRate: number;
  chargebackBreakdown: BreakdownRow[];
  nofBreakdown: BreakdownRow[];
}

export interface SettlementsFeesData {
  grossSettlement: AmountCount;
  netSettlement: AmountCount;
  totalFees: AmountCount;
  interchange: AmountCount;
  schemeFees: AmountCount;
  otherFees: AmountCount;
  settlementsBreakdown: BreakdownRow[];
  feesBreakdown: BreakdownRow[];
}

export enum TabIndex {
  OVERVIEW = 0,
  AUTHENTICATION = 1,
  AUTHORISED_REFUSED = 2,
  PURCHASES_REFUNDS = 3,
  CHARGEBACKS_NOFS = 4,
  SETTLEMENTS_FEES = 5,
}
