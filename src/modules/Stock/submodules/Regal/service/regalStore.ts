import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { zoneIdAtom } from '../../Zone/service/zoneStore';
import { Regal } from '../model/Regal';
import RegalModule from '../Regal.module';

const regalStore = atom([]);
const module = new RegalModule();

export const regalIdAtom = atom<undefined | number>(undefined);

export const regalAtom = atomWithQuery((get) => {
  const params = {
    warehouseId: get(warehouseIdAtom),
  };

  return {
    queryKey: ['regal', get(regalStore), get(zoneIdAtom)],
    queryFn: async ({ queryKey: [, , zoneId] }): Promise<Regal[]> => {
      const response = await module.apiService.getAll({
        pagination: { per_page: 300 },
        params: zoneId ? Object.assign(params, { zoneId }) : params,
      });

      return response.data;
    },
  };
});
