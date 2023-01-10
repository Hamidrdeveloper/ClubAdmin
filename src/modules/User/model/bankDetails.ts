// this is what we receive from server
export interface BankDetailPure {
  id: number;
  bic: string;
  iban: string;
  bank_name: string;
}

// what we send to the server
export interface BankDetailFormCtx extends BankDetailPure {
  user_id: number;
}
