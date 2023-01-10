import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Permission } from '../model/permission.entity';
import PermissionModule from '../Permission.module';

const permissionStore = atom([]);
const module = new PermissionModule();

export const permissionAtom = atomWithQuery((get) => ({
  queryKey: ['permission', get(permissionStore)],
  queryFn: async (): Promise<Permission[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 1000 } })).data,
}));
