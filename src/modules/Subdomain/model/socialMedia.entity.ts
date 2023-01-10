interface SettingBase {
  template_setting_id: number;
  partner_id: number;
  subdomain_id: number;
  company_id?: number;
  slug: string;
}

export interface SocialMediaPure extends SettingBase {
  id: 15;
  template_setting_id: 16;
  slug: 'social-media';
  data: SocialMediaModel[];
}

export interface SocialMediaModel {
  name: string;
  url: string;
  icon_url: string;
}
