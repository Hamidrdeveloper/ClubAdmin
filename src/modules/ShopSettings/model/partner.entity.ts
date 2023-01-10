import { SettingBase } from './entity';

export interface PartnerPure extends SettingBase {
  id: 12;
  template_setting_id: 10;
  partner_id: null;
  slug: 'partner';
  data: PartnerModel;
}

export interface PartnerModel {
  partner: string;
  partner_detail: string;
  partner_picture: string;
  file_id: number;
}
