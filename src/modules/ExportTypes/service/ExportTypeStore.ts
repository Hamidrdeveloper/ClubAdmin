import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import ExportTypeModule from '../ExportType.module';
import { ExportTypeModel } from '../model/ExportsTypes.entity';

const exportTypeStore = atom([]);
const module = new ExportTypeModule();

export const exportTypeAtom = atomWithQuery((get) => ({
  queryKey: ['export-type', get(exportTypeStore)],
  queryFn: async (): Promise<ExportTypeModel[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 10 } })).data,
}));
