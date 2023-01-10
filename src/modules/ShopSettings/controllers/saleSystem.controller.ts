import { SaleSystemModel } from '../model/saleSystem.entity';
import { editSaleSystemSettings, getSaleSystemSettings } from '../services/saleSystem.service';

export const getSaleSystemSetting = async (): Promise<SaleSystemModel | null> =>
  await getSaleSystemSettings();

export const editSaleSystemSetting = async (data: SaleSystemModel): Promise<SaleSystemModel | null> =>
  await editSaleSystemSettings({
    data,
    id: 7,
    partner_id: null,
    slug: 'sale-system',
    template_setting_id: 10,
  });
