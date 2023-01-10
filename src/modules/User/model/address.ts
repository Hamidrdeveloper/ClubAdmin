import { Country } from '@src/modules/Country';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface AddressPure {
  id: number;
  title: string;
  address: adrs;
  gender: string;
  last_name: string;
  first_name: string;
  company_name: string;
  address_complete: string;
  translate: AddressTranslate[] | TranslateContext | { de: { locale: 'de'; title: string } };
  country_id: number;
  emails: EmailModel[];
  phones: PhoneModel[];
  websites: WebsiteModel[];
}

export interface ContactGroupsContext {
  country_id: number;
  user_id: number | undefined;
  translate: { de: { locale: string; title: string } };
  last_name: string;
  first_name: string;
  addresses: {
    address1: string;
    house_number: number;
    postal_code: number;
    city: string;
  }[];
}

interface WebsiteModel {
  id: number | undefined;
  type: string;
  url: string;
}

interface EmailModel {
  id: number | undefined;
  email: string;
}

interface PhoneModel {
  id: number | undefined;
  type: string;
  number: string;
}

export interface AddressFormCtx extends AddressPure {
  user_id: number;
  addresses: adrs[] | undefined;
}

export interface Address extends AddressPure {
  country: Country;
}

interface AddressTranslate extends GeneralTranslate {
  contact_group_id: number;
}

interface adrs {
  id: number;
  city: string;
  state: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  latitude: number;
  longitude: number;
  postal_code: string;
  house_number: string;
  additional: string | null;
  post_identity: string;
  title: string;
  address_complete: string;
  pack_station_number: null | number;
  is_pack_station: boolean;
  gln_number: null | number;
  is_post_office: boolean;
  country?: Country;
}

export interface SetAsInvoiceFormCtx {
  invoice_contact_group_id: number;
}

export interface SetAsInvoiceModel {
  // NOTE: This is what we receive on API
  // usually: ["It does not belong to you. And It is not created by you."]
  message: string;
}

export interface SetProfilePicModel {
  message: string;
}

export interface SetProfileFormCtx {
  file_id: number | null;
}
