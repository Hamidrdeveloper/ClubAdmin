import { Coupon } from './coupon.entity';

export interface CouponFormContext extends Coupon {
  codes: string | null;
  product_variation_ids: number[];
}
