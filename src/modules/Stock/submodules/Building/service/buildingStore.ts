import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import BuildingModule from '../Building.module';
import { Building } from '../model/Building';

const buildingStore = atom([]);
const module = new BuildingModule();
export const buildingIdAtom = atom<undefined | number>(undefined);

export const buildingAtom = atomWithQuery((get) => {
  return {
    queryKey: ['building', get(buildingStore)],
    queryFn: async (): Promise<Building[]> =>
      (
        await module.apiService.getAll({
          // TODO ask per_page
          pagination: { per_page: 300 },
          params: {
            warehouseId: get(warehouseIdAtom),
          },
        })
      ).data,
  };
});
