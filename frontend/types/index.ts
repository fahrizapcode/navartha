export interface Brand {
  name: string;
  owner: string;
  timestamp: number;
  status: string;       // "Pending" | "Approved"
  verified: boolean;
  approved_at: number;
  approver: string;
}

export interface ActivityEvent {
  id: string;
  type: 'BrandRegistered' | 'BrandApproved';
  brandName: string;
  owner: string;
  timestamp: number;
  txHash?: string;
  approver?: string;
}

export type TxStatus = 'idle' | 'pending' | 'success' | 'failed' | 'rejected';

export interface TxState {
  status: TxStatus;
  hash?: string;
  error?: string;
}
