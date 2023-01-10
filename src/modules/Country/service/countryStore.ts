import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import CountryModule from '../Country.module';
import { Country } from '../model';

const countryStore = atom([]);
const module = new CountryModule();

export const countryAtom = atomWithQuery((get) => ({
  queryKey: ['country', get(countryStore)],
  queryFn: async (): Promise<Country[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 259 }, params: { isActive: true } })).data,
}));
