import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Unit } from '../model/unit.entity';
import UnitModule from '../Unit.module';

const unitStore = atom([]);
const module = new UnitModule();

export const unitAtom = atomWithQuery((get) => ({
  queryKey: ['unit', get(unitStore)],
  queryFn: async (): Promise<Unit[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 105 }, params: { isActive: true } })).data,
}));
