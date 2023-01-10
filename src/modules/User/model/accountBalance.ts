import { PaymentMethod } from '@src/modules/PaymentMethod';

import { User } from './personalInfo';

interface AccountBalancePure {
  id: number;
  amount: number;
  user_id: number;
  positive: boolean;
  created_at: string;
  total_amount: number;
  accountable_id: number;
  total_positive: boolean;
  accountable_type: string;
  payment_method_id: number;
  total_amount_symbol: string;
}
export interface AccountBalanceModel extends AccountBalancePure {
  user: User;
  paymentMethod: PaymentMethod;
  accountable: AccountableModel;
}

interface AccountablePure {
  id: number;
  link: string;
  number: string;
  file_id: number;
  user_id: number;
  order_id: number;
  order_type: string;
  updated_at: string;
  created_at: string;
  created_by_id: number;
  document_type_id: number;
  created_by_fullname: string;
}
interface AccountableModel extends AccountablePure {
  created_by: User;
}
