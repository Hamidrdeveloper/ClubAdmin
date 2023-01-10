import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { PaymentMethod } from '../model/paymentMethod.entity';
import PaymentMethodModule from '../PaymentMethod.module';

const paymentMethodStore = atom([]);
const module = new PaymentMethodModule();

export const paymentMethodAtom = atomWithQuery((get) => ({
  queryKey: ['paymentMethod', get(paymentMethodStore)],
  queryFn: async (): Promise<PaymentMethod[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 14 }, params: { isActive: true } })).data,
}));
