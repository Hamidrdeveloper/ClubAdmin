import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Referrer } from '../model/Referrer.entity';
import ReferrerModule from '../Referrer.module';

const referrerStore = atom([]);
const module = new ReferrerModule();

export const referrerAtom = atomWithQuery((get) => ({
  queryKey: ['referrers', get(referrerStore)],
  queryFn: async (): Promise<Referrer[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 400 }, params: { isActive: true } })).data,
}));
