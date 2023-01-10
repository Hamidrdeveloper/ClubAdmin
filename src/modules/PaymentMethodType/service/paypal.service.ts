import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { PaypalModel, PaypalPure } from '../model/paypal.entity';

const settingsAPI = new ApiBuilder<PaypalPure>('/settings', i18n.t('ShopSettings.Tab.Paypal'));

export const getPaypalSettings = async (): Promise<PaypalModel | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/paypal',
      method: 'GET',
    })) as unknown as PaypalModel;
  } catch (e) {
    throw new Error(e);
  }
};

export const editPaypalSettings = async (data: PaypalPure): Promise<PaypalModel | null> => {
  try {
    const result = (await settingsAPI.request({
      url: '/settings/paypal',
      body: data,
      method: 'PUT',
    })) as unknown as PaypalModel;

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('ShopSettings.Tab.Paypal') }));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
