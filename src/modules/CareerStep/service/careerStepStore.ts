import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import CareerStepModule from '../CareerStep.module';
import { CareerStep } from '../model/careerstep.entity';

const careerstepStore = atom([]);
const module = new CareerStepModule();

export const careerStepAtom = atomWithQuery((get) => ({
  queryKey: ['careerstep', get(careerstepStore)],
  queryFn: async (): Promise<CareerStep[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 30 }, params: { isActive: true } })).data,
}));
