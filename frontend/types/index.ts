export interface Brand {
  name: string;
  owner: string;
  timestamp: number;
}

export interface ActivityEvent {
  id: string;
  brandName: string;
  owner: string;
  timestamp: number;
  txHash?: string;
}

export type TxStatus = 'idle' | 'pending' | 'success' | 'failed' | 'rejected';

export interface TxState {
  status: TxStatus;
  hash?: string;
  error?: string;
}
