import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import FlagModule from '../Flag.module';
import { Flag } from '../model/flag.entity';

const flagStore = atom([]);
const module = new FlagModule();

export const flagAtom = atomWithQuery((get) => ({
  queryKey: ['flags', get(flagStore)],
  queryFn: async (): Promise<Flag[]> =>
    await (
      await module.apiService.getAll({ pagination: { per_page: 10 }, params: { isActive: true } })
    ).data,
}));
