import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { ShippingMethod } from '../model/shippingMethod.entity';
import ShippingMethodModule from '../ShippingMethod.module';

const shippingMethodStore = atom([]);
const module = new ShippingMethodModule();

export const shippingMethodAtom = atomWithQuery((get) => ({
  queryKey: ['shippingMethod', get(shippingMethodStore)],
  queryFn: async (): Promise<ShippingMethod[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 17 }, params: { isActive: true } })).data,
}));
