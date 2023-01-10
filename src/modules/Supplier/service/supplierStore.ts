import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Supplier } from '../model/supplier.entity';
import SupplierModule from '../Supplier.module';

const supplierStore = atom([]);
const module = new SupplierModule();

export const supplierAtom = atomWithQuery((get) => ({
  queryKey: ['supplier', get(supplierStore)],
  queryFn: async (): Promise<Supplier[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 100 }, params: { isActive: true } })).data,
}));
