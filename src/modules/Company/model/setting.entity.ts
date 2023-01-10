export interface SettingBase {
  slug: string;
  partner_id: number | null;
  company_id: number | null;
  subdomain_id: number | null;
  template_setting_id: number;
}
