import { ProductCategory } from '@modules/ProductCategory';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface ProductPure {
  id: number;
  name: string;
  number: string;
  number_series_position_id: number;
  point: number;
  file_id: number;
  is_active: boolean;
  default_vat: number;
  description: string;
  file: string | number;
  main_variation_id: number;
  max_order_quantity: number;
  min_order_quantity: number;
  auto_active_net_stock: boolean;
  auto_deactive_net_stock: boolean;
  interval_order_quantity: number;
  maximum_sale_for_each_user: number;
  translate: GeneralTranslate[] | TranslateContext;
  release_date: string | Date;
  available_until: string | Date;
}

export interface Product extends ProductPure {
  productCategories: ProductCategory[];
}
