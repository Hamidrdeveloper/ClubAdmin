import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { ShippingProfile } from '../model/shippingProfile.entity';
import ShippingProfileModule from '../ShippingProfile.module';

const shippingProfileStore = atom([]);
const module = new ShippingProfileModule();

export const shippingProfileAtom = atomWithQuery((get) => ({
  queryKey: ['shippingProfile', get(shippingProfileStore)],
  queryFn: async (): Promise<ShippingProfile[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 17 }, params: { isActive: true } })).data,
}));
