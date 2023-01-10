import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Package } from '../model/package.entity';
import PackageModule from '../Package.module';

const packageStore = atom([]);

const module = new PackageModule();

export const packageAtom = atomWithQuery((get) => ({
  queryKey: ['package', get(packageStore)],
  queryFn: async (): Promise<Package[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 15 }, params: { isActive: true } })).data,
}));
