import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { DPDModel, DPDPure } from '../model/dpd.entity';

const settingsAPI = new ApiBuilder<DPDPure>('/settings', i18n.t('DPD.Title'));

export const getDPDSettings = async (): Promise<DPDModel | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/DPD',
      method: 'GET',
    })) as unknown as DPDModel;
  } catch (e) {
    throw new Error(e);
  }
};

export const editDPDSettings = async (data: DPDPure): Promise<DPDModel | null> => {
  try {
    const result = (await settingsAPI.request({
      url: '/settings/DPD',
      body: data,
      method: 'PUT',
    })) as unknown as DPDModel;

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('ShopSettings.Tab.DPD') }));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
