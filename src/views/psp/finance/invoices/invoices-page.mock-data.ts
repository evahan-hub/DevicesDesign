import type { BentoColumn } from '@adyen/bento-vue2';
import { BentoColumnOverflow, BentoFilterItemType } from '@adyen/bento-vue2';
import type { BentoFilterBarModel } from '@adyen/bento-vue2';
import type { Invoice } from './invoices-page.types';

export const INVOICES_COLUMNS: BentoColumn[] = [
  { field: 'invoiceNumber', label: 'Invoice number', minWidth: 160, mandatory: true, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'issued', label: 'Issued', minWidth: 140, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'due', label: 'Due', minWidth: 140, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'period', label: 'Period', minWidth: 190, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'account', label: 'Account', minWidth: 160, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'amount', label: 'Amount', minWidth: 160, numeric: true },
  { field: 'status', label: 'Status', minWidth: 140, overflow: BentoColumnOverflow.ELLIPSIS },
];

export const INVOICES_FILTERS: BentoFilterBarModel = [
  { field: 'dateIssued', label: 'Date issued', value: null, options: { listboxItems: [{ value: 'today', label: 'Today' }, { value: 'last7days', label: 'Last 7 days' }, { value: 'thisMonth', label: 'This month' }, { value: 'last3months', label: 'Last 3 months' }] }, type: BentoFilterItemType.SELECT },
  { field: 'period', label: 'Period', value: null, options: { listboxItems: [{ value: 'q1_2025', label: 'Q1 2025' }, { value: 'q2_2025', label: 'Q2 2025' }, { value: 'q3_2025', label: 'Q3 2025' }, { value: 'q4_2024', label: 'Q4 2024' }] }, type: BentoFilterItemType.SELECT },
  { field: 'legalEntity', label: 'Legal entity', value: null, options: { listboxItems: [{ value: 'acme', label: 'ACME Corp' }, { value: 'fr', label: 'FR Entity' }, { value: 'es', label: 'ES Entity' }, { value: 'it', label: 'IT Entity' }] }, type: BentoFilterItemType.SELECT },
  { field: 'account', label: 'Account', value: null, options: { listboxItems: [{ value: 'ACME', label: 'ACME' }, { value: 'FR-2957WZXQ', label: 'FR-2957WZXQ' }, { value: 'ES-8539RGLT', label: 'ES-8539RGLT' }, { value: 'IT-1058VMPC', label: 'IT-1058VMPC' }, { value: 'NL-7492HBJE', label: 'NL-7492HBJE' }] }, type: BentoFilterItemType.SELECT },
  { field: 'status', label: 'Status', value: null, options: { listboxItems: [{ value: 'Paid', label: 'Paid' }, { value: 'Pending', label: 'Pending' }, { value: 'Overdue', label: 'Overdue' }] }, type: BentoFilterItemType.SELECT },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: '1', invoiceNumber: '10453', issued: 'Oct 03, 2025', due: 'Nov 03, 2025', period: 'Sep 1–Sep 30, 2025', account: 'ACME', amount: 928573, currency: 'EUR', status: 'Pending' },
  { id: '2', invoiceNumber: '10452', issued: 'Sep 03, 2025', due: 'Oct 03, 2025', period: 'Aug 1–Aug 31, 2025', account: 'FR-2957WZXQ', amount: 683927, currency: 'EUR', status: 'Pending' },
  { id: '3', invoiceNumber: '10451', issued: 'Aug 03, 2025', due: 'Sep 03, 2025', period: 'Jul 1–Jul 31, 2025', account: 'ES-8539RGLT', amount: 257194, currency: 'EUR', status: 'Overdue' },
  { id: '4', invoiceNumber: '10450', issued: 'Jul 03, 2025', due: 'Aug 03, 2025', period: 'Jun 1–Jun 30, 2025', account: 'IT-1058VMPC', amount: 814752, currency: 'EUR', status: 'Paid' },
  { id: '5', invoiceNumber: '10449', issued: 'Jun 03, 2025', due: 'Jul 03, 2025', period: 'May 1–May 31, 2025', account: 'NL-7492HBJE', amount: 390216, currency: 'EUR', status: 'Paid' },
  { id: '6', invoiceNumber: '10448', issued: 'May 03, 2025', due: 'Jun 03, 2025', period: 'Apr 1–Apr 30, 2025', account: 'BE-3865IYZS', amount: 765489, currency: 'EUR', status: 'Paid' },
  { id: '7', invoiceNumber: '10447', issued: 'Apr 03, 2025', due: 'May 03, 2025', period: 'Mar 1–Mar 31, 2025', account: 'PT-9216FODU', amount: 432105, currency: 'EUR', status: 'Paid' },
  { id: '8', invoiceNumber: '10446', issued: 'Mar 03, 2025', due: 'Apr 03, 2025', period: 'Feb 1–Feb 28, 2025', account: 'GR-4723YKLA', amount: 987631, currency: 'EUR', status: 'Paid' },
  { id: '9', invoiceNumber: '10445', issued: 'Feb 03, 2025', due: 'Mar 03, 2025', period: 'Jan 1–Jan 31, 2025', account: 'SE-5140CXVB', amount: 149568, currency: 'EUR', status: 'Paid' },
  { id: '10', invoiceNumber: '10444', issued: 'Jan 03, 2025', due: 'Feb 03, 2025', period: 'Dec 1–Dec 31, 2024', account: 'FI-0671MNJH', amount: 501842, currency: 'EUR', status: 'Paid' },
];
