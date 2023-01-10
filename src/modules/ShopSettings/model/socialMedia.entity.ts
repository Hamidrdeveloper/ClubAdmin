import { SettingBase } from './entity';

export interface SocialMediaPure extends SettingBase {
  id: 15;
  template_setting_id: 16;
  partner_id: null;
  slug: 'social-media';
  data: SocialMediaModel[];
}

export interface SocialMediaModel {
  name: string;
  url: string;
  icon_url: string;
}
