export interface CaseItem {
  id: string;
  pspReference: string;
  merchantReference: string;
  merchantAccount: string;
  amount: { value: number; currency: string };
  paymentMethod: string;
  shopperEmail: string;
  shopperCountry: string;
  riskScore: number;
  status: CaseStatus;
  assignee: string | null;
  creationDate: string;
  lastEvent: string;
  tags: string[];
}

export type CaseStatus = 'open' | 'in_review' | 'accepted' | 'rejected' | 'expired';

export enum CaseTab {
  OPEN = 0,
  MY_CASES = 1,
  CLOSED = 2,
}

export interface CaseAction {
  type: 'accept' | 'reject' | 'assign';
  caseIds: string[];
  assignee?: string;
}
