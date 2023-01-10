import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { SocialMediaModel, SocialMediaPure } from '../model/socialMedia.entity';

const settingsAPI = new ApiBuilder<SocialMediaPure>('/settings', i18n.t('ShopSettings.Tab.SocialMedia'));

export const getSocialMediaSettings = async (): Promise<SocialMediaModel[] | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/social-media',
      method: 'GET',
    })) as unknown as SocialMediaModel[];
  } catch (e) {
    throw new Error(e);
  }
};

export const editSocialMediaSettings = async (data: SocialMediaPure): Promise<SocialMediaModel[] | null> => {
  try {
    const result = (await settingsAPI.request({
      url: '/settings/social-media',
      body: data,
      method: 'PUT',
    })) as unknown as SocialMediaModel[];

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('ShopSettings.Tab.SocialMedia') }));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
