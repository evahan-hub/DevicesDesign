import type { InvoiceDetail, FeeType, FeeDetailRow, MerchantAccount } from './invoice-detail.types';

export const MOCK_INVOICES: Record<string, InvoiceDetail> = {
  '10453': { invoiceNumber: '10453', account: 'ACME', issued: 'Oct 3, 2025', due: 'Oct 13, 2025', period: 'Sep 1 – Sep 30, 2025', status: 'Pending', invoiced: 91062, deducted: 67306, dueAmount: 27356 },
  '10452': { invoiceNumber: '10452', account: 'ACME', issued: 'Sep 3, 2025', due: 'Sep 13, 2025', period: 'Aug 1 – Aug 31, 2025', status: 'Overdue', invoiced: 88200, deducted: 60000, dueAmount: 28200 },
  '10451': { invoiceNumber: '10451', account: 'ACME', issued: 'Aug 3, 2025', due: 'Aug 13, 2025', period: 'Jul 1 – Jul 31, 2025', status: 'Paid', invoiced: 77500, deducted: 50000, dueAmount: 27500 },
  'AC202602056100': { invoiceNumber: 'AC202602056100', account: 'ACME US', issued: 'Oct 3, 2025', due: 'Oct 13, 2025', period: 'Sep 1 – Sep 30, 2025', status: 'Pending', invoiced: 20250, deducted: 0, dueAmount: 20250 },
  'AC202602056200': { invoiceNumber: 'AC202602056200', account: 'ACME Canada', issued: 'Oct 3, 2025', due: 'Oct 13, 2025', period: 'Sep 1 – Sep 30, 2025', status: 'Pending', invoiced: 14200, deducted: 0, dueAmount: 14200 },
  'AC202602056300': { invoiceNumber: 'AC202602056300', account: 'ACME UK', issued: 'Oct 3, 2025', due: 'Oct 13, 2025', period: 'Sep 1 – Sep 30, 2025', status: 'Paid', invoiced: 13232, deducted: 0, dueAmount: 13232 },
  'AC202602056388': { invoiceNumber: 'AC202602056388', account: 'ACME Italy', issued: 'Oct 3, 2025', due: 'Oct 13, 2025', period: 'Sep 1 – Sep 30, 2025', status: 'Pending', invoiced: 14250, deducted: 0, dueAmount: 14250 },
};

export const FEE_TYPES: FeeType[] = [
  { id: 'processing', label: 'Processing fees', amount: 20250, isSummary: false, isNegative: false },
  { id: 'payment-method', label: 'Payment method fees', amount: 26464, isSummary: false, isNegative: false },
  { id: 'interchange', label: 'Refund fees', amount: 13232, isSummary: false, isNegative: false },
  { id: 'commissions', label: 'Revenue Protect Service', amount: 13232, isSummary: false, isNegative: false },
  { id: 'non-transactional', label: 'Non-transactional scheme fees', amount: 10050, isSummary: false, isNegative: false },
  { id: 'subtotal', label: 'Sub-total', amount: 90062, isSummary: true, isNegative: false },
  { id: 'vat', label: 'VAT Tax 10%', amount: 1000, isSummary: true, isNegative: false },
  { id: 'deducted-s', label: 'Deducted', amount: 67306, isSummary: true, isNegative: true },
  { id: 'total', label: 'Total', amount: 27356, isSummary: true, isNegative: false },
];

export const FEE_DETAIL_ROWS: FeeDetailRow[] = [
  { label: 'Transaction fee 1-1000', subtitle: '1000 transactions', invoiced: 11000, turnover: 300000, deducted: -11000, rate: '0.11 USD/transaction', deductedRate: '0.11 USD/transaction' },
  { label: 'Transaction fee 1001-5000', subtitle: '925 transactions', invoiced: 9250, turnover: 222122, deducted: -10175, rate: '0.10 USD/transaction', deductedRate: '0.11 USD/transaction' },
];

export const NON_TRANSACTIONAL_FEE_DETAIL_ROWS: FeeDetailRow[] = [
  { label: 'Mastercard 3D Secure Fee', subtitle: '', invoiced: 5000, turnover: 0, deducted: 0, rate: '', deductedRate: '' },
  { label: 'Visa 3D Secure Fee', subtitle: '', invoiced: 5050, turnover: 0, deducted: 0, rate: '', deductedRate: '' },
];

export const PAYMENT_METHOD_FEE_DETAIL_ROWS: FeeDetailRow[] = [
  { label: 'Interchange Issuing Banks', subtitle: '522 transactions', invoiced: 10000, turnover: 222122, deducted: -6000, rate: 'Pass-through', deductedRate: 'Pass-through' },
  { label: 'Commission Blend (paybybank)', subtitle: '422 transactions', invoiced: 3232, turnover: 100000, deducted: -1988, rate: 'Pass-through', deductedRate: 'Pass-through' },
  { label: 'Authorisation Scheme fee - Refused retries', subtitle: '286 transactions', invoiced: 13232, turnover: 200000, deducted: -7988, rate: 'Pass-through', deductedRate: 'Pass-through' },
];

export const REFUND_FEE_DETAIL_ROWS: FeeDetailRow[] = [
  { label: 'Commission Blend Refunds (klarna)', subtitle: '48 transactions', invoiced: 13232, turnover: 522122, deducted: -7988, rate: 'Pass-through', deductedRate: 'Pass-through' },
];

export const REVENUE_PROTECT_FEE_DETAIL_ROWS: FeeDetailRow[] = [
  { label: 'Risk fee (RevenueProtect) <= 60000', subtitle: '47,527 transaction', invoiced: 13232, turnover: 482150680, deducted: 0, rate: '0.0400 USD/transaction', deductedRate: '' },
];

export const FEE_ROWS_MAP: Record<string, FeeDetailRow[]> = {
  'processing': FEE_DETAIL_ROWS,
  'payment-method': PAYMENT_METHOD_FEE_DETAIL_ROWS,
  'interchange': REFUND_FEE_DETAIL_ROWS,
  'commissions': REVENUE_PROTECT_FEE_DETAIL_ROWS,
  'non-transactional': NON_TRANSACTIONAL_FEE_DETAIL_ROWS,
};

export const MERCHANT_ACCOUNTS: MerchantAccount[] = [
  { id: 'acme-us', label: 'ACME US', fullName: 'ACME US', amount: 20250, isSummary: false, isNegative: false, invoiceRef: 'AC202602056100' },
  { id: 'acme-ca', label: 'ACME Canada', fullName: 'ACME Canada', amount: 14200, isSummary: false, isNegative: false, invoiceRef: 'AC202602056200' },
  { id: 'acme-uk', label: 'ACME UK', fullName: 'ACME UK', amount: 13232, isSummary: false, isNegative: false, invoiceRef: 'AC202602056300' },
  { id: 'acme-it', label: 'ACME Italy', fullName: 'ACME Italy', amount: 14250, isSummary: false, isNegative: false, invoiceRef: 'AC202602056388' },
  { id: 'acme-nl', label: 'ACME Netherlands', fullName: 'ACME Netherlands', amount: 28130, isSummary: false, isNegative: false, invoiceRef: 'AC202602056388' },
  { id: 'subtotal', label: 'Sub-total', fullName: '', amount: 90062, isSummary: true, isNegative: false, invoiceRef: '' },
  { id: 'vat', label: 'VAT Tax 10%', fullName: '', amount: 1000, isSummary: true, isNegative: false, invoiceRef: '' },
  { id: 'deducted', label: 'Deducted', fullName: '', amount: 67306, isSummary: true, isNegative: true, invoiceRef: '' },
  { id: 'due', label: 'Due', fullName: '', amount: 27356, isSummary: true, isNegative: false, invoiceRef: '' },
];
