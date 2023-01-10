interface SettingBase {
  template_setting_id: number;
  partner_id: number;
  subdomain_id: number;
  slug: string;
  company_id?: number;
}

export interface SaleSystemPure extends SettingBase {
  id: 7;
  template_setting_id: 10;
  slug: 'sale-system';
  data: SaleSystemModel;
}

export interface SaleSystemModel {
  bic: string;
  city: string;
  company_name: string;
  country_id: number;
  country: string;
  currency_id: number;
  currency: string;
  email: string;
  fax: string | null;
  house_number: string;
  language: string;
  language_id: number;
  phone: string;
  postal_code: number;
  street: string;
  tax_number: string;
  template: string;
  vat_number: string;
}
