import { Country } from '@src/modules/Country';

interface VariationMLMPure {
  id: number;
  is_active: boolean;
  qv: number | undefined;
  provision_price: number | undefined;
  product_variation_id: number | undefined;
  percentage_of_provision: number | undefined;
}

export interface VariationMLM extends VariationMLMPure {
  country: Country | null;
}

export interface VariationMLMFormCtx extends VariationMLMPure {
  country_id: number;
}
