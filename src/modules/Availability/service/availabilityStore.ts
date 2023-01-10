import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import AvailabilityModule from '../Availability.module';
import { Availability } from '../model/Availability.entity';

const availabilityStore = atom([]);
const module = new AvailabilityModule();

export const availabilityAtom = atomWithQuery((get) => ({
  queryKey: ['availabilities', get(availabilityStore)],
  queryFn: async (): Promise<Availability[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 10 }, params: { isActive: true } })).data,
}));
