export interface Invoice {
  [key: string]: unknown;
  id: string;
  invoiceNumber: string;
  issued: string;
  due: string;
  period: string;
  account: string;
  amount: number;
  currency: string;
  status: string;
}
