import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import CouponModule from '../Coupon.module';
import { Coupon } from '../model';

const couponStore = atom([]);
const module = new CouponModule();

export const couponAtom = atomWithQuery((get) => ({
  queryKey: ['coupon', get(couponStore)],
  queryFn: async (): Promise<Coupon[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 124 }, params: { isActive: true } })).data,
}));
