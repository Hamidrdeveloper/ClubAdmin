import { SocialMediaModel } from '../model/socialMedia.entity';
import { editSocialMediaSettings, getSocialMediaSettings } from '../services/socialMedia.service';

export const getSocialMediaSetting = async (): Promise<SocialMediaModel[] | null> =>
  await getSocialMediaSettings();

export const editSocialMediaSetting = async (data: SocialMediaModel[]): Promise<SocialMediaModel[] | null> =>
  await editSocialMediaSettings({
    data,
    id: 15,
    partner_id: null,
    slug: 'social-media',
    template_setting_id: 16,
  });
