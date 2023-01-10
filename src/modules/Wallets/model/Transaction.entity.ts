import { WalletListModel } from './WalletList.entity';

interface TransactionPure {
  id: number;
  wallet_id: number;
  type: string;
  amount: string;
  uuid: string;
  meta: unknown;
  date: string;
}

export interface TransactionModel extends TransactionPure {
  wallet: WalletListModel;
}
