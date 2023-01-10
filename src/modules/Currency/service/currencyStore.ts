import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import CurrenModule from '../Currency.module';
import { Currency } from '../model/currency.entity';

const currencyStore = atom([]);

const module = new CurrenModule();
export const fetchAllCurrenciesAtom = atom<boolean>(false);

export const currencyAtom = atomWithQuery((get) => ({
  queryKey: ['currency', get(currencyStore), get(fetchAllCurrenciesAtom)],
  queryFn: async (): Promise<Currency[]> =>
    (
      await module.apiService.getAll({
        pagination: { per_page: 139 },
        params: get(fetchAllCurrenciesAtom) ? {} : { isActive: true },
      })
    ).data,
}));
