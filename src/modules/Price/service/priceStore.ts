import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Price } from '../model/price.entity';
import PriceModule from '../Price.module';

const priceStore = atom([]);
const module = new PriceModule();

export const priceAtom = atomWithQuery((get) => ({
  queryKey: ['price', get(priceStore)],
  queryFn: async (): Promise<Price[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 18 } })).data,
}));
