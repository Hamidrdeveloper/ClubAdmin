import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { DHLModel, DHLPure } from '../model/dhl.entity';

const settingsAPI = new ApiBuilder<DHLPure>('/settings', i18n.t('DHL.Title'));

export const getDHLSettings = async (): Promise<DHLModel | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/DHL',
      method: 'GET',
    })) as unknown as DHLModel;
  } catch (e) {
    throw new Error(e);
  }
};

export const editDHLSettings = async (data: DHLPure): Promise<DHLModel | null> => {
  try {
    const result = (await settingsAPI.request({
      url: '/settings/DHL',
      body: data,
      method: 'PUT',
    })) as unknown as DHLModel;

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('DHL.Title') }));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
