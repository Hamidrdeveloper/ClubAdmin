import { SocialMediaModel } from '../model/socialMedia.entity';
import { editSocialMediaSettings, getSocialMediaSettings } from '../services/socialMedia.service';

export const getSocialMediaSetting = async (
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<SocialMediaModel[] | null> => await getSocialMediaSettings(subdomain_id, partner_id, company_id);

export const editSocialMediaSetting = async (
  data: SocialMediaModel[],
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<SocialMediaModel[] | null> =>
  await editSocialMediaSettings({
    data,
    id: 15,
    partner_id,
    subdomain_id,
    company_id,
    slug: 'social-media',
    template_setting_id: 16,
  });
