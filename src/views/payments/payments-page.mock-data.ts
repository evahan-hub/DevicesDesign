import type { BentoColumn } from '@adyen/bento-vue2';
import { BentoColumnOverflow, BentoFilterItemType } from '@adyen/bento-vue2';
import type { BentoFilterBarModel } from '@adyen/bento-vue2';
import type { Payment } from './payments-page.types';

export const PAYMENTS_COLUMNS: BentoColumn[] = [
  { field: 'amount', label: 'Amount', minWidth: 140, numeric: true },
  { field: 'pspReference', label: 'PSP reference', minWidth: 220, overflow: BentoColumnOverflow.ELLIPSIS, mandatory: true },
  { field: 'status', label: 'Status', minWidth: 160, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'paymentMethod', label: 'Payment method', minWidth: 200, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'date', label: 'Date', minWidth: 180, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'account', label: 'Account', minWidth: 180, overflow: BentoColumnOverflow.ELLIPSIS },
];

export const PAYMENTS_FILTERS: BentoFilterBarModel = [
  { field: 'dateFilter', label: 'Date', value: null, options: { listboxItems: [{ value: 'today', label: 'Today' }, { value: 'yesterday', label: 'Yesterday' }, { value: 'last7days', label: 'Last 7 days' }, { value: 'thisMonth', label: 'This month' }] }, type: BentoFilterItemType.SELECT },
  { field: 'status', label: 'Status', value: null, options: { listboxItems: [{ value: 'Authorised', label: 'Authorised' }, { value: 'Settled', label: 'Settled' }, { value: 'Refused', label: 'Refused' }, { value: 'SentForSettle', label: 'SentForSettle' }] }, type: BentoFilterItemType.SELECT },
  { field: 'paymentMethod', label: 'Payment method', value: null, options: { listboxItems: [{ value: 'Visa', label: 'Visa' }, { value: 'Mastercard', label: 'Mastercard' }, { value: 'iDEAL', label: 'iDEAL' }, { value: 'PayPal', label: 'PayPal' }, { value: 'Amex', label: 'Amex' }] }, type: BentoFilterItemType.SELECT },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: '1', amount: 15000, currency: 'EUR', pspReference: 'KDN8FPRT3BGT9Y7C', status: 'Settled', paymentMethod: 'Visa', date: 'Oct 24, 2025, 14:30', account: 'AdyenTestAccount' },
  { id: '2', amount: 2500, currency: 'USD', pspReference: 'VXZ2LMNQ5JHW6R4P', status: 'Refused', paymentMethod: 'Mastercard', date: 'Oct 23, 2025, 12:15', account: 'AdyenTestAccount' },
  { id: '3', amount: 9900, currency: 'EUR', pspReference: 'S4G7CKB9Z1DFM3V', status: 'Authorised', paymentMethod: 'iDEAL', date: 'Oct 23, 2025, 09:45', account: 'AdyenTestAccount' },
  { id: '4', amount: 12550, currency: 'GBP', pspReference: 'T8YHJN5R2WEXQ6A9', status: 'SentForSettle', paymentMethod: 'Visa', date: 'Oct 22, 2025, 17:45', account: 'GlobalMerchant' },
  { id: '5', amount: 1000, currency: 'EUR', pspReference: 'P6M3C7V1L9KDF2Z8', status: 'Settled', paymentMethod: 'PayPal', date: 'Oct 21, 2025, 21:05', account: 'AdyenTestAccount' },
  { id: '6', amount: 84000, currency: 'USD', pspReference: 'B5N4W7S8G9R2T1Q', status: 'Authorised', paymentMethod: 'Amex', date: 'Oct 20, 2025, 10:10', account: 'GlobalMerchant' },
  { id: '7', amount: 550, currency: 'EUR', pspReference: 'F3H2J6K1L5P9M7N8', status: 'Settled', paymentMethod: 'Visa', date: 'Oct 19, 2025, 14:22', account: 'AdyenTestAccount' },
  { id: '8', amount: 3300, currency: 'EUR', pspReference: 'ZXC7VBNM4LKJHG2F', status: 'Refused', paymentMethod: 'iDEAL', date: 'Oct 18, 2025, 11:11', account: 'AdyenTestAccount' },
  { id: '9', amount: 4999, currency: 'GBP', pspReference: 'QWERT9YUI1OPASDF', status: 'Settled', paymentMethod: 'Mastercard', date: 'Oct 17, 2025, 23:59', account: 'GlobalMerchant' },
  { id: '10', amount: 1200, currency: 'EUR', pspReference: 'G5HJK3L4M2NBVCX', status: 'Authorised', paymentMethod: 'PayPal', date: 'Oct 16, 2025, 06:45', account: 'AdyenTestAccount' },
  { id: '11', amount: 21000, currency: 'USD', pspReference: 'R4T6Y8U1I3O5P7A9', status: 'Settled', paymentMethod: 'Visa', date: 'Oct 15, 2025, 07:00', account: 'GlobalMerchant' },
  { id: '12', amount: 750, currency: 'EUR', pspReference: 'S2D4F6G8H1J3K5L7', status: 'SentForSettle', paymentMethod: 'Mastercard', date: 'Oct 14, 2025, 18:00', account: 'AdyenTestAccount' },
  { id: '13', amount: 3450, currency: 'EUR', pspReference: 'X1C3V5B7N9M2L4K6', status: 'Authorised', paymentMethod: 'iDEAL', date: 'Oct 13, 2025, 03:45', account: 'AdyenTestAccount' },
  { id: '14', amount: 9999, currency: 'GBP', pspReference: 'A8S7D6F5G4H3J2K1', status: 'Refused', paymentMethod: 'Visa', date: 'Oct 12, 2025, 16:55', account: 'GlobalMerchant' },
  { id: '15', amount: 1500, currency: 'EUR', pspReference: 'POIU9YTRE6WQAS2D', status: 'Settled', paymentMethod: 'PayPal', date: 'Oct 11, 2025, 13:13', account: 'AdyenTestAccount' },
  { id: '16', amount: 6200, currency: 'USD', pspReference: 'MNB4VCX5ZLKJHG3F', status: 'Settled', paymentMethod: 'Amex', date: 'Oct 10, 2025, 23:00', account: 'GlobalMerchant' },
];
