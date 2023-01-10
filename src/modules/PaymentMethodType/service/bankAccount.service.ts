import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { BankAccountModel, BankAccountPure } from '../model/bankAccount.entity';

const settingsAPI = new ApiBuilder<BankAccountPure>('/settings', i18n.t('ShopSettings.Tab.BankAccount'));

export const getBankAccountSettings = async (): Promise<BankAccountModel[] | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/bank-accounts',
      method: 'GET',
    })) as unknown as BankAccountModel[];
  } catch (e) {
    throw new Error(e);
  }
};

export const editBankAccountSettings = async (data: BankAccountPure): Promise<BankAccountModel[] | null> => {
  try {
    const result = (await settingsAPI.request({
      url: '/settings/bank-accounts',
      body: data,
      method: 'PUT',
    })) as unknown as BankAccountModel[];

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('ShopSettings.Tab.BankAccount') }));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
