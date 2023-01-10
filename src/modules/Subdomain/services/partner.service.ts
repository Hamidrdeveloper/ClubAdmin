import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { PartnerModel, PartnerPure } from '../model/partner.entity';
import { Subdomain } from '../model/Subdomain.entity';

const settingsAPI = new ApiBuilder<PartnerPure>('/subdomains', i18n.t('Subdomain.Tabs.Partner'));

export const getPartnerSettings = async (
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<PartnerModel | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/partner',
      method: 'GET',
      params: { subdomain_id, partner_id, company_id },
    })) as unknown as PartnerModel;
  } catch (e) {
    throw new Error(e);
  }
};

export const editPartnerSettings = async (data: PartnerPure): Promise<PartnerModel | null> => {
  try {
    const result = (await settingsAPI.request({
      url: `subdomains/${data?.subdomain_id}/save-data`,
      body: { data: { partner: data?.data } },
      method: 'PUT',
    })) as unknown as Subdomain;

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Subdomain.Tabs.Partner') }));
    return result?._data?.partner;
  } catch (e) {
    throw new Error(e);
  }
};
