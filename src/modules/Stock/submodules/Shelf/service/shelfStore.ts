import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { regalIdAtom } from '../../Regal/service/regalStore';
import { Shelf } from '../model/shelf';
import ShelfModule from '../Shelf.module';

const shelfStore = atom([]);
const module = new ShelfModule();

export const shelfAtom = atomWithQuery((get) => {
  const params = {
    warehouseId: get(warehouseIdAtom),
  };

  return {
    queryKey: ['shelf', get(shelfStore), get(regalIdAtom)],
    queryFn: async ({ queryKey: [, , regalId] }): Promise<Shelf[]> => {
      const response = await module.apiService.getAll({
        pagination: { per_page: 300 },
        params: regalId ? Object.assign(params, { regalId }) : params,
      });

      return response.data;
    },
  };
});
