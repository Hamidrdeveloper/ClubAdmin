import { SettingBase } from '../../ShopSettings/model/entity';

export interface DPDPure extends SettingBase {
  id: 16;
  partner_id: null;
  slug: 'dpd';
  data: DPDModel;
}

export interface DPDModel {
  customer_number: string;
  delis_id: string;
  message_language: string;
  password: string;
  saturday_delivery: boolean;
  staging: boolean;
}
