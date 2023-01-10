import { AT_Options } from '@src/modules/AttributeOptions/model/attributeOptions.entity';
import { AttributeTypes } from '@src/modules/AttributeType';
import { Barcode } from '@src/modules/Barcode';
import { Country } from '@src/modules/Country';
import { Currency } from '@src/modules/Currency';
import { CustomTariff } from '@src/modules/CustomTariff';
import { PricePure } from '@src/modules/Price';
import { PriceType } from '@src/modules/PriceType';
import { ProductCategory } from '@src/modules/ProductCategory';
import { ShippingProfile } from '@src/modules/ShippingProfile';
import { Unit } from '@src/modules/Unit';
import { User } from '@src/modules/User';
import { VariationCategory } from '@src/modules/VariationCategory';

import { ProductVariation } from './ProductVariation.entity';

export interface VariationSettingsPure
  extends VariationTranslate,
    VariationPackage,
    VariationVats,
    VariationFiles {
  id: number;
  type: string;
  point: number;
  number: string;
  quantity: number;
  inherit: boolean;
  is_main: boolean;
  is_active: boolean;
  purchase_price: number;
  max_order_quantity: number;
  min_order_quantity: number;
  release_date: string | Date;
  auto_active_net_stock: boolean;
  available_until: string | Date;
  multi_variation_quantity: number;
  number_series_position_id: number;
  auto_deactivate_net_stock: boolean;
  maximum_sale_for_each_user: number;
  free_logistics_for_customer: boolean;
  free_logistics_for_partner: boolean;
  sale_price: {
    unit_price: number;
    value: number;
    gross_value: number;
    iso3: string;
    user_discount: number;
    value_after_discount: number;
    gross_value_after_discount: number;
    vat_percent: number;
  };
}

export interface VariationSettings extends VariationSettingsPure {
  unit: Unit;
  barcodes: Barcode[];
  customTariff: CustomTariff;
  shippingProfiles: ShippingProfile[];
  productCategories: ProductCategory[];
  crossSellingVariations: ProductVariation[];
}

export interface VariationSettingsContext extends VariationSettingsPure {
  unit_id: number;
  barcodeIds: number[];
  product_id: number | null;
  availability_id: number;
  custom_tariff_id: number;
  shippingProfileIds: number[];
  product_category_ids: number[];
  crossSellingVariations: number[];
}

export interface VariationTranslate {
  translate: {
    name: string;
    locale: string;
    description: string;
    preview_text: string;
    meta_keywords: string;
    technical_data: string;
    meta_description: string;
  }[];
}

export interface VariationPricePure {
  value: number;
  minimum_quantity: number;
  // We Don't receive this field from back, we have to calculate locally
  gross: number | string;
  available_from: string | Date;
}

/* We Changed into single select without changing backend structure -- @Rahimi Asked */
interface PriceForVariationPrice extends PricePure {
  currency: Currency;
  priceType: PriceType;
  countries: Country;
}
export interface VariationPrice extends VariationPricePure {
  price: PriceForVariationPrice;
}

interface PricesContext {
  id: number;
  unit_price: number;
  currency_id: number;
  min_quantity: number;
  country_ids: number[];
  price_type_id: number;
  display_for_new_item: boolean;
}

export interface VariationPriceContext extends VariationPricePure {
  price_id: number;
  prices: PricesContext;
}

export interface VariationUserPricePure {
  value: number;
  minimum_quantity: number;
  available_from: string | Date;
}

export interface VariationUserPrice extends VariationUserPricePure {
  user: User;
  price: PriceForVariationPrice;
}

export interface VariationUserPriceContext extends VariationUserPricePure {
  user_id: number;
  price_id: number;
  prices: PricesContext;
}

export interface VariationPrices {
  productVariationPrices: VariationPrice[];
  userVariationPrices: VariationUserPrice[];
}

export interface VariationPricesContext {
  productVariationPrices: Partial<VariationPriceContext[]>;
  userVariationPrices: Partial<VariationUserPriceContext[]>;
}

export interface VariationPackage {
  packages: {
    id: number;
    gross_weight: number;
    height: number;
    length: number;
    net_weight: number;
    packing_type_id: number;
    width: number;
    quantity: number;
  }[];
}

export interface VariationPackageContext {
  packages: { package_id: number; quantity: number }[];
}

export interface VariationMultiProduct {
  multiProductVariations: { variation: ProductVariation; quantity: number }[];
}

export interface VariationMultiProductContext {
  multi_product_variations: { id: number; multi_variation_quantity: number }[];
}

export interface VariationVats {
  productVariationVats: { id: number; vat_id: number; country: Country }[];
}

export interface VariationVatsContext {
  productVariationVats: { vat_id: number }[];
}

export interface VariationAttributes {
  attributes: VariationAttribute[];
  productVariationCategories: VariationCategory[];
}

export interface VariationAttributesContext {
  productVariationCategories: number[];
  attributes: VariationAttributeContext[];
}

export interface VariationAttributeContext {
  visible: boolean;
  attribute_type_id: number;
  attribute_type_option_id: number;
}

export interface VariationAttribute {
  visible: boolean;
  attribute_type_id: number;
  is_auto_generated: boolean;
  attributeType: AttributeTypes;
  product_variation_id?: number;
  attributeTypeOption: AT_Options;
  attribute_type_option_id: number;
  translate: { locale?: string; value: string }[];
}

export interface VariationFile {
  id: number;
  type: string;
  title: string;
  link: string;
  file: number;
  file_id: number;
  file_self_id: number;
}

export interface VariationFiles {
  productVariationFiles: VariationFile[];
}
