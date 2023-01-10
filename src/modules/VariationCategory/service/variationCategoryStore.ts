import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { VariationCategory } from '../model/variationCategory.entity';
import VariationCategoryModule from '../VariationCategory.module';

const variationCategoryStore = atom([]);
const module = new VariationCategoryModule();

export const variationCategoryAtom = atomWithQuery((get) => ({
  queryKey: ['variationCategory', get(variationCategoryStore)],
  queryFn: async (): Promise<VariationCategory[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 13 }, params: { isActive: true } })).data,
}));
