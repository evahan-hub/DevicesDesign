import type { BentoColumn } from '@adyen/bento-vue2';
import type { LifecycleRow, EventRow } from './payment-details.types';

export const LIFECYCLE_COLUMNS: BentoColumn[] = [
  { field: 'journal', label: 'Journal Type', width: 200 },
  { field: 'date', label: 'Date', minWidth: 260 },
  { field: 'user', label: 'Audit user', minWidth: 260 },
  { field: 'seq', label: 'Installment sequence', minWidth: 160 },
];

export const LIFECYCLE_DATA: LifecycleRow[] = [
  { id: 1, journal: 'Authorised', date: 'Dec 28, 2020, 12:26:35 GMT+2', user: 'ws_29124@Company.test', seq: '-' },
  { id: 2, journal: 'Received', date: 'Dec 28, 2020, 12:26:35 GMT+2', user: 'ws_29124@Company.test', seq: '-' },
];

export const EVENTS_COLUMNS: BentoColumn[] = [
  { field: 'type', label: 'Type', width: 200 },
  { field: 'psp', label: 'PSP reference', minWidth: 260 },
  { field: 'merchant', label: 'Merchant reference', minWidth: 260 },
  { field: 'status', label: 'Status', minWidth: 160 },
];

export const EVENTS_DATA: EventRow[] = [
  { id: 1, type: 'Capture', psp: 'ZNQPBSJD3CTVLD75', merchant: '1216597958.MYJZ2KHB0BJV', status: 'SentForSettle' },
  { id: 2, type: 'Payment', psp: 'ZNQPBSJD3CTVLD75', merchant: '1216597958.MYJZ2KHB0BJV', status: 'SentForSettle' },
];
