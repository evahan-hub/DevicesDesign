export interface Payment {
  [key: string]: unknown;
  id: string;
  amount: number;
  currency: string;
  pspReference: string;
  status: string;
  paymentMethod: string;
  date: string;
  account: string;
}
