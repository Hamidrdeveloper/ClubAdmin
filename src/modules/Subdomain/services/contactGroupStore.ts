import { ApiBuilder } from '@src/shared/utils';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { ContactGroup } from '../model/Subdomain.entity';

const contactGroupStore = atom([]);
export const contactGroupSupplierId = atom<number | undefined>(undefined);

const apiService = new ApiBuilder<ContactGroup>('contact-groups');

export const contactGroupAtom = atomWithQuery((get) => ({
  queryKey: ['contactGroups', get(contactGroupStore)],
  queryFn: async (): Promise<ContactGroup[]> =>
    (
      await apiService.getAll({
        pagination: { per_page: 50 },
        params: { isActive: true, supplierId: get(contactGroupSupplierId) },
      })
    ).data,
}));
