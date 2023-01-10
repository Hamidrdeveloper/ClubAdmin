import { Country } from '@modules/Country';
import { Currency } from '@modules/Currency';
import { PriceType } from '@modules/PriceType';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface PricePure {
  id: number;
  name: string;
  interval: string;
  created_at: Date;
  updated_at: Date;
  unit_price: number;
  min_quantity: number;
  display_for_new_item: boolean;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface Price extends PricePure {
  currency: Currency;
  priceType: PriceType;
  countries: Country[];
}
