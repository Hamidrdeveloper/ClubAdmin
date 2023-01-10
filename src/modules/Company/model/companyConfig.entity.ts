import { SettingBase } from './setting.entity';

export interface CompanyConfigTitleFullModel extends SettingBase {
  id: 47;
  partner_id: null | number;
  subdomain_id: null | number;
  slug: 'website-title';
  data: {
    title: string;
  };
  company_id: null | number;
}

export interface CompanyConfigLogoFullModel extends SettingBase {
  id: 19;
  partner_id: null | number;
  subdomain_id: null | number;
  slug: 'logo';
  data: {
    file_id: number;
    file_path: string;
  };
  company_id: null | number;
}

export interface CompanyConfigFavIconFullModel extends SettingBase {
  id: 20;
  partner_id: number | null;
  subdomain_id: number | null;
  slug: 'favicon';
  data: {
    file_id: number;
    file_path: string;
  };
  company_id: number | null;
}
