import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { PackingType } from '../model/packingType.entity';
import PackingTypeModule from '../PackingType.module';

const packingTypeStore = atom([]);
const module = new PackingTypeModule();

export const packingTypeAtom = atomWithQuery((get) => ({
  queryKey: ['packingType', get(packingTypeStore)],
  queryFn: async (): Promise<PackingType[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 18 }, params: { isActive: true } })).data,
}));
