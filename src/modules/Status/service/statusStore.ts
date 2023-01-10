import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Status } from '../model/status.entity';
import StatusModule from '../Status.module';

const statusStore = atom([]);
const module = new StatusModule();

export const statusAtom = atomWithQuery((get) => ({
  queryKey: ['status', get(statusStore)],
  queryFn: async (): Promise<Status[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 45 }, params: { isActive: true } })).data,
}));
