import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { PaymentTerm } from '../model/paymentTerm.entity';
import PaymentTermModule from '../PaymentTerm.module';

const paymentTermStore = atom([]);
const module = new PaymentTermModule();

export const paymentTermAtom = atomWithQuery((get) => ({
  queryKey: ['paymentTerm', get(paymentTermStore)],
  queryFn: async (): Promise<PaymentTerm[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 14 }, params: { isActive: true } })).data,
}));
