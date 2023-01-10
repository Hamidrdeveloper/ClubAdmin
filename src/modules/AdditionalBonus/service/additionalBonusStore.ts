import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import AdditionalBonusModule from '../AdditionalBonus.module';
import { AdditionalBonus } from '../model/additionalBonus.entity';

const additionalBonusStore = atom([]);
const module = new AdditionalBonusModule();

export const additionalBonusAtom = atomWithQuery((get) => ({
  queryKey: ['additionalBonus', get(additionalBonusStore)],
  queryFn: async (): Promise<AdditionalBonus[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 10 }, params: { isActive: true } })).data,
}));
