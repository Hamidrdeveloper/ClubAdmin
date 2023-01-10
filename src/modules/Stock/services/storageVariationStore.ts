import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { StorageVariation } from '../model/storageVariation';
import { warehouseIdAtom } from '../pages/StockManage.page';
import { StorageVariationModule } from '../Stock.module';

const storageVariationStore = atom([]);
const module = new StorageVariationModule();

export const productVariationIdAtom = atom<number | undefined>(undefined);

export const storageVariationAtom = atomWithQuery((get) => ({
  queryKey: ['storageVariation', get(storageVariationStore)],
  queryFn: async (): Promise<StorageVariation[]> =>
    (
      await module.apiService.getAll({
        pagination: { per_page: 300 },
        params: { warehouseId: get(warehouseIdAtom), productVariationId: get(productVariationIdAtom) },
      })
    ).data,
}));
