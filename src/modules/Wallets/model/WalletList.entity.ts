import { User } from '@src/modules/User';

export interface WalletListPure {
  id: number;
  balance: string;
  uuid: string;
  created_at: string;
}

export interface WalletListModel extends WalletListPure {
  user: User;
}
