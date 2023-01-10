import { selectedStorageVariationFieldsAtom } from '@src/modules/Stock/components/StorageVariationForm';
import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import FloorModule from '../Floor.module';
import { Floor } from '../model/floor';

const floorStore = atom([]);
const module = new FloorModule();

export const relatedFloorAtom = atomWithQuery((get) => {
  const params = {
    warehouseId: get(warehouseIdAtom),
  };

  const buildingId = get(selectedStorageVariationFieldsAtom).building?.id;

  return {
    queryKey: ['floor', get(floorStore), buildingId],
    queryFn: async ({ queryKey: [, , buildingId] }): Promise<Floor[]> => {
      const response = await module.apiService.getAll({
        pagination: { per_page: 300 },
        params: buildingId ? Object.assign(params, { buildingId }) : params,
      });
      return response.data;
    },
  };
});
