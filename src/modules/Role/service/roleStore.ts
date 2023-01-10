import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Role } from '../model/role.entity';
import RoleModule from '../Role.module';

const roleStore = atom([]);
const module = new RoleModule();

export const roleAtom = atomWithQuery((get) => ({
  queryKey: ['role', get(roleStore)],
  queryFn: async (): Promise<Role[]> =>
    (
      await module.apiService.getAll({
        pagination: { per_page: 15 },
        params: { companyVisibility: true, ownerVisibility: true },
      })
    ).data,
}));
