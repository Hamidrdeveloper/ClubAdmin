import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { PartnerModel, PartnerPure } from '../model/partner.entity';

const settingsAPI = new ApiBuilder<PartnerPure>('/settings', i18n.t('ShopSettings.Tab.Partner'));

export const getPartnerSettings = async (): Promise<PartnerModel | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/partner',
      method: 'GET',
    })) as unknown as PartnerModel;
  } catch (e) {
    throw new Error(e);
  }
};

export const editPartnerSettings = async (data: PartnerPure): Promise<PartnerModel | null> => {
  try {
    const result = (await settingsAPI.request({
      url: '/settings/partner',
      body: data,
      method: 'PUT',
    })) as unknown as PartnerModel;

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('ShopSettings.Tab.Partner') }));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
