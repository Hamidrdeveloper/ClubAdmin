export interface SettingBase {
  template_setting_id: number;
  partner_id: null;
  slug: string;
}

export interface PaypalPure extends SettingBase {
  id: 11;
  template_setting_id: 10;
  partner_id: null;
  slug: 'paypal';
  data: PaypalModel;
}

export interface PaypalModel {
  paypal_currency: string;
  paypal_production_client_id: string;
  paypal_production_client_secret: string;
}
