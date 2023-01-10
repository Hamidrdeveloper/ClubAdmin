import { Country } from '@src/modules/Country';
import { Currency } from '@src/modules/Currency';
import { ContactGroups } from '@src/modules/User';

export interface CompanyPure {
  id: number;
  bic: string;
  iban: string;
  name: string;
  swift: string;
  logo_id: number;
  is_main: boolean;
  bank_name: string;
  logo_path: string;
  is_active: boolean;
  tax_number: string;
  chief_name: string;
  vat_number: string;
  is_default: boolean;
  contact_group_id: number;
}

export interface CompanyModel extends CompanyPure {
  countries: Country[];
  currencies: Currency[];
  contactGroup: ContactGroups;
}

export interface CompanyFormCtx extends CompanyPure {
  // PartnerId is used for createByCompany only
  partner_id?: number;
  country_ids: number[];
  currency_ids: number[];
}
