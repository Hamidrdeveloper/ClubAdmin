import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { PriceType } from '../model/priceType.entity';
import PriceTypeModule from '../PriceType.module';

const priceTypeStore = atom([]);
const module = new PriceTypeModule();

export const priceTypeAtom = atomWithQuery((get) => ({
  queryKey: ['priceType', get(priceTypeStore)],
  queryFn: async (): Promise<PriceType[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 35 }, params: { isActive: true } })).data,
}));
