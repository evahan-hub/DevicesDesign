export interface InvoiceDetail {
  invoiceNumber: string;
  account: string;
  issued: string;
  due: string;
  period: string;
  status: string;
  invoiced: number;
  deducted: number;
  dueAmount: number;
}

export interface FeeType {
  id: string;
  label: string;
  amount: number;
  isSummary: boolean;
  isNegative: boolean;
}

export interface FeeDetailRow {
  label: string;
  subtitle: string;
  invoiced: number;
  deducted: number;
  rate: string;
  deductedRate: string;
}

export interface MerchantAccount {
  id: string;
  label: string;
  fullName: string;
  amount: number;
  isSummary: boolean;
  isNegative: boolean;
  invoiceRef: string;
}
