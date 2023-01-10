import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { CareerStepModel } from '../model/CareerStep.entity';

const careerStore = atom([]);
const API = new ApiBuilder<CareerStepModel>('career-steps', i18n.t('Competition.Rule.CareerStep'));

export const careerStepAtom = atomWithQuery((get) => ({
  queryKey: ['careerStep', get(careerStore)],
  queryFn: async (): Promise<CareerStepModel[]> => (await API.getAll({ pagination: { per_page: 20 } })).data,
}));
