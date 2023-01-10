import { SettingBase } from './setting.entity';

export interface AnalyticTagsFullModel extends SettingBase {
  id: 14;
  template_setting_id: 7;
  slug: 'analytic-tags';
  data: AnalyticTagsDataModel[];
}

export interface AnalyticTagsDataModel {
  locale: string;
  google: string;
  'microsoft-uet': string;
}
