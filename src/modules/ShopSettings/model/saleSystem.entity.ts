import { SettingBase } from './entity';

export interface SaleSystemPure extends SettingBase {
  id: 7;
  template_setting_id: 10;
  partner_id: null;
  slug: 'sale-system';
  data: SaleSystemModel;
}

export interface SaleSystemModel {
  bic: string;
  city: string;
  company_name: string;
  country_id: number;
  country: string;
  email: string;
  fax: string | null;
  house_number: string;
  phone: string;
  postal_code: number;
  street: string;
  tax_number: string;
  template: string;
  vat_number: string;
  communication_by_letter_price: number;
}
