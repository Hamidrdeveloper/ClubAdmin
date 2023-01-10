import { selectedStorageVariationFieldsAtom } from '@src/modules/Stock/components/StorageVariationForm';
import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Regal } from '../model/Regal';
import RegalModule from '../Regal.module';

const regalStore = atom([]);
const module = new RegalModule();

export const relatedRegalAtom = atomWithQuery((get) => {
  const params = {
    warehouseId: get(warehouseIdAtom),
  };

  const selected = get(selectedStorageVariationFieldsAtom);
  const zoneId = selected?.zone?.id;
  const floorId = selected?.floor?.id;
  const buildingId = selected?.building?.id;

  return {
    queryKey: ['regal', get(regalStore), zoneId, floorId, buildingId],
    queryFn: async ({ queryKey: [, , zoneId, floorId, buildingId] }): Promise<Regal[]> => {
      const response = await module.apiService.getAll({
        pagination: { per_page: 300 },
        params: zoneId ? Object.assign(params, { zoneId, floorId, buildingId }) : params,
      });

      return response.data;
    },
  };
});
