interface SettingBase {
  template_setting_id: number;
  partner_id: number;
  company_id?: number;
  subdomain_id: number;
  slug: string;
}

export interface AnalyticTagsPure extends SettingBase {
  id: 14;
  template_setting_id: 7;
  slug: 'analytic-tags';
  data: AnalyticTagsModel[];
}

export interface AnalyticTagsModel {
  locale: string | null;
  google: string;
  'microsoft-uet': string;
}

export interface AnalyticTagsFormModel {
  data: AnalyticTagsModel[];
}
