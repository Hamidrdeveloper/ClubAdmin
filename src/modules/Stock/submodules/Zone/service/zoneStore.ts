import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { floorIdAtom } from '../../Floor/service/floorStore';
import { Zone } from '../model/zone';
import ZoneModule from '../Zone.module';

const zoneStore = atom([]);
const module = new ZoneModule();

export const zoneIdAtom = atom<undefined | number>(undefined);

export const zoneAtom = atomWithQuery((get) => {
  const params = {
    warehouseId: get(warehouseIdAtom),
  };
  return {
    queryKey: ['zone', get(zoneStore), get(floorIdAtom)],
    queryFn: async ({ queryKey: [, , floorId] }): Promise<Zone[]> => {
      const response = await module.apiService.getAll({
        // TODO: ask for per_page pagination number
        pagination: { per_page: 300 },
        params: floorId ? Object.assign(params, { floorId }) : params,
      });
      return response.data;
    },
  };
});
