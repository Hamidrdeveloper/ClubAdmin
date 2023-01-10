import { PaypalModel } from '../model/paypal.entity';
import { editPaypalSettings, getPaypalSettings } from '../service/paypal.service';

export const getPaypalSetting = async (): Promise<PaypalModel | null> => await getPaypalSettings();

export const editPaypalSetting = async (data: PaypalModel): Promise<PaypalModel | null> =>
  await editPaypalSettings({
    data,
    id: 11,
    partner_id: null,
    slug: 'paypal',
    template_setting_id: 10,
  });
