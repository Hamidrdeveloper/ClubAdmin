interface SettingBase {
  template_setting_id: number;
  partner_id: number;
  subdomain_id: number;
  company_id?: number;
  slug: string;
}

export interface PartnerPure extends SettingBase {
  id: 12;
  template_setting_id: 10;
  slug: 'partner';
  data: PartnerModel;
}

export interface PartnerModel {
  partner: string;
  partner_detail: string;
  partner_picture: string;
  file_id: number;
  email : string,
  phone:string
}
