import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import DownloadCategoryModule from '../Download.module';
import { DownloadCategoryModel } from '../model/DownloadCategory.entity';

const categoryStore = atom([]);
const module = new DownloadCategoryModule();

export const downloadCategoryAtom = atomWithQuery((get) => ({
  queryKey: ['download-category', get(categoryStore)],
  queryFn: async (): Promise<DownloadCategoryModel[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 100 } })).data,
}));

export const selectedCategoryAtom = atom<DownloadCategoryModel | undefined>(undefined);
