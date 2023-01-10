import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { AnalyticTagsModel, AnalyticTagsPure } from '../model/analyticTags.entity';
import { Subdomain } from '../model/Subdomain.entity';

const settingsAPI = new ApiBuilder<AnalyticTagsPure>('/subdomains', i18n.t('Subdomain.Tabs.AnalyticTags'));

export const getAnalyticTagsSettings = async (
  subdomain_id: number,
  partner_id: number,
  companyId?: number,
): Promise<AnalyticTagsModel[] | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/analytic-tags',
      method: 'GET',
      params: { subdomain_id, partner_id, company_id: companyId },
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
      url: `subdomains/${data?.subdomain_id}/save-data`,
      body: { data: { analytic_tag: data?.data } },
      method: 'PUT',
    })) as unknown as Subdomain;

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Subdomain.Tabs.AnalyticTags') }));
    return result?._data?.analytic_tag;
  } catch (e) {
    throw new Error(e);
  }
};
