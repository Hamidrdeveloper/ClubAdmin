import { Availability } from '@src/modules/Availability';
import { Country } from '@src/modules/Country';
import { Partner } from '@src/modules/Partner';
import { Referrer } from '@src/modules/Referrer';
import { Subdomain } from '@src/modules/Subdomain';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface StockPure {
  id: number;
  name: string;
  type: string;
  priority: string;
  strategy: string;
  conditions: string;
  description: string;
  freight_logistic: number;
  stack_acting_mode: number;
  has_dynamic_reorder: number;
  logistic_type: string | null;
  exists_product_availability_id: number;
  not_exists_product_availability_id: number;
}

// Get One Method - this is what we recieve from server
export interface Stock extends StockPure {
  countries: Country[];
  referrers: Referrer[];
  subdomains: Subdomain[];
  partner: Partner;
  contactGroup: ContactGroup;
  translate: StockTranslate[];
  warehouseRepair: Stock | null;
  existsProductAvailability: Availability;
  notExistsProductAvailability: Availability;

  // these fields added to be able to manage contact groups more easily - formManagement fields
  fax: string;
  telephone: string;
  email: string;
}

interface ContactGroup {
  id: number;
  country: Country;
  country_id: number;
  title: string | null;
  phones: { id: number; type: string; number: number }[];
  emails: { id: number; email: string }[];
  translate: GeneralTranslate[] | TranslateContext;
  address: adrs;
}
interface adrs {
  id: number;
  city: string;
  state: string;
  address1: string;
  address2: string | null;
  address3: string | null;
  address4: string | null;
  latitude: number;
  longitude: number;
  postal_code: string;
  house_number: string;
  additional: null;
  post_identity: string;
  title: string;
  pack_station_number: null;
  is_pack_station: boolean;
  gln_number: null;
  is_post_office: boolean;
  address_complete: string;
}

export interface StockTranslate {
  warehouse_id: number;
  locale: string;
  name: string;
  description: string;
}

// What we send to server - Store Method - Create One
export interface StockFormCtx extends StockPure {
  country_ids: number[];
  partner_id: number | undefined;
  warehouse_repair_id: number | null;
  referrer_ids: number[] | undefined;
  subdomain_ids: number[] | undefined;
  contactGroup: {
    country_id: number;
    title: string | null;
    phones: Phones[];
    emails: { email: string }[] | undefined;
    addresses: adrs[];
  };
}

export interface Phones {
  type: 'phone' | 'fax';
  number: string | number;
}
