import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { buildingIdAtom } from '../../Building/service/buildingStore';
import FloorModule from '../Floor.module';
import { Floor } from '../model/floor';

const floorStore = atom([]);
const module = new FloorModule();

export const floorIdAtom = atom<undefined | number>(undefined);

export const floorAtom = atomWithQuery((get) => {
  const params = {
    warehouseId: get(warehouseIdAtom),
  };
  return {
    queryKey: ['floor', get(floorStore), get(buildingIdAtom)],
    queryFn: async ({ queryKey: [, , buildingId] }): Promise<Floor[]> => {
      const response = await module.apiService.getAll({
        pagination: { per_page: 300 },
        params: buildingId ? Object.assign(params, { buildingId }) : params,
      });
      return response.data;
    },
  };
});
