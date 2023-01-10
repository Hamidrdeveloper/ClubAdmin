export interface SettingBase {
  template_setting_id: number;
  partner_id: null;
  slug: string;
}
export interface BankAccountPure extends SettingBase {
  id: 2;
  template_setting_id: 2;
  partner_id: null;
  slug: 'bank-accounts';
  data: BankAccountModel[];
}

export interface BankAccountModel {
  bank_name: string;
  bank_account_number: string;
  iban: string;
}
