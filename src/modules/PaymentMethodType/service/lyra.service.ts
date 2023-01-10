import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { LyraModel, LyraPure } from '../model/lyra.entity';

const settingsAPI = new ApiBuilder<LyraPure>('/settings', i18n.t('ShopSettings.Tab.Lyra'));

export const getLyraSettings = async (): Promise<LyraModel | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/lyra',
      method: 'GET',
    })) as unknown as LyraModel;
  } catch (e) {
    throw new Error(e);
  }
};

export const editLyraSettings = async (data: LyraPure): Promise<LyraModel | null> => {
  try {
    const result = (await settingsAPI.request({
      url: '/settings/lyra',
      body: data,
      method: 'PUT',
    })) as unknown as LyraModel;

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('ShopSettings.Tab.Lyra') }));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
