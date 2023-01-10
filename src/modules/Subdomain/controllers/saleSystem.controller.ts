import { SaleSystemModel } from '../model/saleSystem.entity';
import { editSaleSystemSettings, getSaleSystemSettings } from '../services/saleSystem.service';

export const getSaleSystemSetting = async (
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<SaleSystemModel | null> => await getSaleSystemSettings(subdomain_id, partner_id, company_id);

export const editSaleSystemSetting = async (
  data: SaleSystemModel,
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<SaleSystemModel | null> =>
  await editSaleSystemSettings({
    data,
    id: 7,
    partner_id,
    company_id,
    subdomain_id,
    slug: 'sale-system',
    template_setting_id: 10,
  });
