import { SettingBase } from './setting.entity';

export interface SocialMediaFullModel extends SettingBase {
  id: 15;
  template_setting_id: 16;
  slug: 'social-media';
  data: SocialMediaModel[];
  partner_id: number | null;
  company_id: number | null;
  subdomain_id: number | null;
}

export interface SocialMediaModel {
  name: string;
  url: string;
  icon_url: string;
}
