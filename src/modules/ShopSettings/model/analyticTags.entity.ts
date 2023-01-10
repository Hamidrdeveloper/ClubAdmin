import { SettingBase } from './entity';

export interface AnalyticTagsPure extends SettingBase {
  id: 14;
  template_setting_id: 7;
  partner_id: null;
  slug: 'analytic-tags';
  data: AnalyticTagsModel[];
}

export interface AnalyticTagsModel {
  locale: string;
  google: string;
  'microsoft-uet': string;
}
