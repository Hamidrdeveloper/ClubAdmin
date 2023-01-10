import { PricePure } from './price.entity';

export interface PriceFormContext extends PricePure {
  currency_id: number;
  country_ids: number[];
  price_type_id: number;
}
