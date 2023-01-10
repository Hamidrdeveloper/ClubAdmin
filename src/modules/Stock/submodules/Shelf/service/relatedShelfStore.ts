import { selectedStorageVariationFieldsAtom } from '@src/modules/Stock/components/StorageVariationForm';
import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Shelf } from '../model/shelf';
import ShelfModule from '../Shelf.module';

const shelfStore = atom([]);
const module = new ShelfModule();

export const relatedShelfAtom = atomWithQuery((get) => {
  const params = {
    warehouseId: get(warehouseIdAtom),
  };

  const selected = get(selectedStorageVariationFieldsAtom);
  const buildingId = selected?.building?.id;
  const floorId = selected?.floor?.id;
  const zoneId = selected?.zone?.id;
  const regalId = selected?.regal?.id;

  return {
    queryKey: ['shelf', get(shelfStore), regalId, buildingId, floorId, zoneId],
    queryFn: async ({ queryKey: [, , regalId, buildingId, floorId, zoneId] }): Promise<Shelf[]> => {
      const response = await module.apiService.getAll({
        pagination: { per_page: 300 },
        params: regalId ? Object.assign(params, { regalId, buildingId, floorId, zoneId }) : params,
      });

      return response.data;
    },
  };
});
