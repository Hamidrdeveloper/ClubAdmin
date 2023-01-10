import { PartnerModel } from '../model/partner.entity';
import { editPartnerSettings, getPartnerSettings } from '../services/partner.service';

export const getPartnerSetting = async (): Promise<PartnerModel | null> => await getPartnerSettings();

export const editPartnerSetting = async (data: PartnerModel): Promise<PartnerModel | null> =>
  await editPartnerSettings({
    data,
    id: 12,
    partner_id: null,
    slug: 'partner',
    template_setting_id: 10,
  });
