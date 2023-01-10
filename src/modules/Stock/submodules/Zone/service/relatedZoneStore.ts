import { selectedStorageVariationFieldsAtom } from '@src/modules/Stock/components/StorageVariationForm';
import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Zone } from '../model/zone';
import ZoneModule from '../Zone.module';

const zoneStore = atom([]);
const module = new ZoneModule();

export const relatedZoneAtom = atomWithQuery((get) => {
  const params = {
    warehouseId: get(warehouseIdAtom),
  };
  const selected = get(selectedStorageVariationFieldsAtom);
  const floorId = selected?.floor?.id;
  const buildingId = selected?.building?.id;

  return {
    queryKey: ['zone', get(zoneStore), floorId, buildingId],
    queryFn: async ({ queryKey: [, , floorId, buildingId] }): Promise<Zone[]> => {
      const response = await module.apiService.getAll({
        // TODO: ask for per_page pagination number
        pagination: { per_page: 300 },
        params: floorId ? Object.assign(params, { floorId, buildingId }) : params,
      });
      return response.data;
    },
  };
});
