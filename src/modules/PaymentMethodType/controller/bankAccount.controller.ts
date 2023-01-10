import { BankAccountModel } from '../model/bankAccount.entity';
import { editBankAccountSettings, getBankAccountSettings } from '../service/bankAccount.service';

export const getBankAccountSetting = async (): Promise<BankAccountModel[] | null> =>
  await getBankAccountSettings();

export const editBankAccountSetting = async (data: BankAccountModel[]): Promise<BankAccountModel[] | null> =>
  await editBankAccountSettings({
    data,
    id: 2,
    partner_id: null,
    slug: 'bank-accounts',
    template_setting_id: 2,
  });
