import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface CouponCodes {
  id: number;
  code: string;
}
export interface Coupon {
  id: number;
  name: string;
  amount: number;
  available_until: string | null;
  description: string | null;
  is_active: boolean;
  max_quantity_each_user: number | null;
  quantity: number | null;
  release_date: string | null;
  type: string;
  min_amount: number;
  used_quantity: number;
  first_order: boolean;
  productVariations?: ProductVariation[] | null;
  product_instead_of_discount: boolean;
  couponCodes: CouponCodes[];
  translate: GeneralTranslate[] | TranslateContext;
}
