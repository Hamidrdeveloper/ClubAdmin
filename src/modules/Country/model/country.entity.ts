import { GeneralTranslate, TranslateContext } from '@src/shared/models';
import { Moment } from 'moment';

import { Currency } from '../../Currency/model/currency.entity';

export interface CountryPure {
  id: number;
  name: string;
  default_warranty_days: number;
  max_tax_free_trade: number;
  max_small_business_trade?: number;
  is_eeu: boolean;
  iso2: string;
  iso3: string;
  is_active: boolean;
  is_default: boolean;
  vats: CountryVats[];
  default_vat: number;
  timezone: string | null;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface Country extends CountryPure {
  currency: Currency;
}
export interface CountryVats {
  id: number;
  number: string;
  value: number;
  valid_from: Moment | string;
}
