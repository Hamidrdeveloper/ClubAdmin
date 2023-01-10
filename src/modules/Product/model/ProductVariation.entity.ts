import { Availability } from '@modules/Availability';
import { Barcode } from '@modules/Barcode';
import { CustomTariff } from '@modules/CustomTariff';
import { Product } from '@modules/Product';
import { ShippingProfile } from '@modules/ShippingProfile';
import { Country } from '@src/modules/Country';
import { ProductCategory } from '@src/modules/ProductCategory';
import { Unit } from '@src/modules/Unit';
import { VariationCategory } from '@src/modules/VariationCategory';

import {
  VariationAttribute,
  VariationPrice,
  VariationSettingsPure,
  VariationUserPrice,
} from './ProductVariation-args';
import { VariationSupplier } from './VariationSupplier.entity';

interface Vats {
  id: number;
  value: number;
  number: string;
  country: Country;
  valid_from: string;
}

interface Transportation {
  value: number;
  vat_percent: number;
  gross_value: number;
  iso3: string;
}

export interface ProductVariation extends VariationSettingsPure {
  name: string;
  unit: Unit;
  description: string;
  preview_text: string;
  technical_data: string;
  weight: number | null;
  weight_gross: number;
  meta_keywords: string;
  meta_description: string;
  product: Product;
  barcodes: Barcode[];
  vats: Vats[];
  availability: Availability;
  customTariff: CustomTariff;
  has_serial_number: boolean;
  attributes: VariationAttribute[];
  shippingProfiles: ShippingProfile[];
  productCategories: ProductCategory[];
  productVariationPrices: VariationPrice[];
  userVariationPrices: VariationUserPrice[];
  crossSellingVariations: ProductVariation[];
  multiProductVariations: ProductVariation[];
  productVariationSuppliers: VariationSupplier[];
  productVariationCategories: VariationCategory[];
  transportation?: Transportation;
  productVariationMlmDetails?: { provision_price: number }[];
}
