import { PartnerModel } from '../model/partner.entity';
import { editPartnerSettings, getPartnerSettings } from '../services/partner.service';

export const getPartnerSetting = async (
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<PartnerModel | null> => await getPartnerSettings(subdomain_id, partner_id, company_id);

export const editPartnerSetting = async (
  data: PartnerModel,
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<PartnerModel | null> =>
  await editPartnerSettings({
    data,
    id: 12,
    partner_id,
    company_id,
    subdomain_id,
    slug: 'partner',
    template_setting_id: 10,
  });
