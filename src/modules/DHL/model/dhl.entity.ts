import { SettingBase } from '@src/modules/ShopSettings/model/entity';

export interface DHLPure extends SettingBase {
  id: 17;
  partner_id: null;
  slug: 'dhl';
  data: DHLModel;
}

export interface DHLModel {
  api_password: string;
  api_user: string;
  dhl_business_test_ekp: string;
  dhl_business_test_user_password: string;
  dhl_business_test_user: string;
  ekp: string;
  signature: string;
  test_mode: boolean;
  user: string;
  version: string;
}
