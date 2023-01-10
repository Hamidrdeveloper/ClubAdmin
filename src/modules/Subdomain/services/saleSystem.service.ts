import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { SaleSystemModel, SaleSystemPure } from '../model/saleSystem.entity';

const settingsAPI = new ApiBuilder<SaleSystemPure>('/settings', i18n.t('Subdomain.Tabs.SaleSystem'));

export const getSaleSystemSettings = async (
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<SaleSystemModel | null> => {
  try {
    return (await settingsAPI.request({
      url: '/settings/sale-system',
      method: 'GET',
      params: { subdomain_id, partner_id, company_id },
    })) as unknown as SaleSystemModel;
  } catch (e) {
    throw new Error(e);
  }
};

export const editSaleSystemSettings = async (data: SaleSystemPure): Promise<SaleSystemModel | null> => {
  try {
    const result = (await settingsAPI.request({
      url: '/settings/sale-system',
      body: data,
      method: 'PUT',
    })) as unknown as SaleSystemModel;

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Subdomain.Tabs.SaleSystem') }));
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
