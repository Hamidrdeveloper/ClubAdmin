import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { AnalyticTagsModel, AnalyticTagsPure } from '../model/analyticTags.entity';

const settingsAPI = new ApiBuilder<AnalyticTagsPure>('/settings', i18n.t('ShopSettings.Tab.AnalyticTags'));

export const getAnalyticTagsSettings = async (): Promise<AnalyticTagsModel[] | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/analytic-tags',
      method: 'GET',
    })) as unknown as AnalyticTagsModel[];
  } catch (e) {
    throw new Error(e);
  }
};

export const editAnalyticTagsSettings = async (
  data: AnalyticTagsPure,
): Promise<AnalyticTagsModel[] | null> => {
  try {
    const result = (await settingsAPI.request({
      url: '/settings/analytic-tags',
      body: data,
      method: 'PUT',
    })) as unknown as AnalyticTagsModel[];

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('ShopSettings.Tab.AnalyticTags') }));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
