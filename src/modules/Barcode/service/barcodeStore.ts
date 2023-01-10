import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import BarcodeModule from '../Barcode.module';
import { Barcode } from '../model/barcode.entity';

const barcodeStore = atom([]);
const module = new BarcodeModule();

export const barcodeAtom = atomWithQuery((get) => ({
  queryKey: ['barcode', get(barcodeStore)],
  queryFn: async (): Promise<Barcode[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 1000 }, params: { isActive: true } })).data,
}));
