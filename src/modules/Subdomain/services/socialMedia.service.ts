import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { SocialMediaModel, SocialMediaPure } from '../model/socialMedia.entity';
import { Subdomain } from '../model/Subdomain.entity';

const settingsAPI = new ApiBuilder<SocialMediaPure>('/subdomains', i18n.t('Subdomain.Tabs.SocialMedia'));

export const getSocialMediaSettings = async (
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<SocialMediaModel[] | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/social-media',
      method: 'GET',
      params: { subdomain_id, partner_id, company_id },
    })) as unknown as SocialMediaModel[];
  } catch (e) {
    throw new Error(e);
  }
};

export const editSocialMediaSettings = async (data: SocialMediaPure): Promise<SocialMediaModel[] | null> => {
  try {
    const result = (await settingsAPI.request({
      url: `subdomains/${data?.subdomain_id}/save-data`,
      body: { data: { social_media: data?.data } },
      method: 'PUT',
    })) as unknown as Subdomain;

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Subdomain.Tabs.SocialMedia') }));
    return result?._data?.social_media;
  } catch (e) {
    throw new Error(e);
  }
};
