import { ApiBuilder } from '@src/shared/utils';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { AttributeTypes } from '..';

const attributeTypeStore = atom([]);
const apiService = new ApiBuilder<AttributeTypes>('/attribute-types');

export const attributeTypeIdAtom = atom<number | undefined>(undefined);

export const attributeTypeAtom = atomWithQuery((get) => ({
  queryKey: ['attribute-types', get(attributeTypeStore)],
  queryFn: async (): Promise<AttributeTypes[]> =>
    (await apiService.getAll({ pagination: { per_page: 30 } })).data,
}));
