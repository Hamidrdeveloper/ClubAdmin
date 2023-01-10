import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { ConfigData } from '../model/general.entity';
import { getConfigData } from './generalRequest';

const generalStore = atom([]);

export const generalAtom = atomWithQuery((get) => ({
  queryKey: ['general-data', get(generalStore)],
  queryFn: async (): Promise<ConfigData> => await getConfigData(),
}));
