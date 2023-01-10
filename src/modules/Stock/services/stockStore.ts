import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Stock } from '../model';
import StockModule from '../Stock.module';

const stockStore = atom([]);
const module = new StockModule();

export const stockAtom = atomWithQuery((get) => ({
  queryKey: ['stock', get(stockStore)],
  queryFn: async (): Promise<Stock[]> =>
    //   TODO: ask for how many per_page
    (await module.apiService.getAll({ pagination: { per_page: 30 }, orderBy: { name: 'ASC' } })).data,
}));
