import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import LanguageModule from '../Language.module';
import { Language } from '../model/language.entity';

const languageStore = atom([]);
const module = new LanguageModule();

export const languageAtom = atomWithQuery((get) => ({
  queryKey: ['languages', get(languageStore)],
  queryFn: async (): Promise<Language[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 183 }, params: { isActive: true } })).data,
}));
