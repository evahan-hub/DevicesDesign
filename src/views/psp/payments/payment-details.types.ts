import type { BentoColumn } from '@adyen/bento-vue2';

export type { BentoColumn };

export interface LifecycleRow {
  [key: string]: unknown;
  id: number;
  journal: string;
  date: string;
  user: string;
  seq: string;
}

export interface EventRow {
  [key: string]: unknown;
  id: number;
  type: string;
  psp: string;
  merchant: string;
  status: string;
}
