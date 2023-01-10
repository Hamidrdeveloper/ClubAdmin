import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Partner } from '../model/partner.entity';
import PartnerModule from '../Partner.module';

const partnerStore = atom([]);
const module = new PartnerModule();

export const partnerAtom = atomWithQuery((get) => ({
  queryKey: ['partner', get(partnerStore)],
  queryFn: async (): Promise<Partner[]> =>
    (
      await module.apiService.getAll({
        pagination: { per_page: 100 },
        params: { isActive: true, userIsActive: true },
      })
    ).data,
}));
