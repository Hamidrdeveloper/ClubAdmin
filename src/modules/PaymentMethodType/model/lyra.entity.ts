export interface SettingBase {
  template_setting_id: number;
  partner_id: null;
  slug: string;
}

export interface LyraPure extends SettingBase {
  id: 10;
  subdomain_id: null;
  slug: 'lyra';
  data: LyraModel;
}

export interface LyraModel {
  lyra_currency: string | null;
  lyra_mode: string | null;
  lyra_sandbox_username: string | null;
  lyra_sandbox_password: string | null;
  lyra_production_username: string | null;
  lyra_production_password: string |null;
}
