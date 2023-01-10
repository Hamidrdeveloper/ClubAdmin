import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { UserType } from '../model/userType.entity';
import USerTypeModule from '../UserType.module';

const userTypeStore = atom([]);
const module = new USerTypeModule();

export const userTypeAtom = atomWithQuery((get) => ({
  queryKey: ['userType', get(userTypeStore)],
  queryFn: async (): Promise<UserType[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 100 }, params: { isActive: true } })).data,
}));
