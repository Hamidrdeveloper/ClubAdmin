import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { PaymentMethodType } from '../model/paymentMethodType.entity';
import PaymentMethodTypeModule from '../PaymentMethodType.module';

const paymentMethodTypeStore = atom([]);
const module = new PaymentMethodTypeModule();

export const paymentMethodTypeAtom = atomWithQuery((get) => ({
  queryKey: ['paymentMethodType', get(paymentMethodTypeStore)],
  queryFn: async (): Promise<PaymentMethodType[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 17 }, params: { isActive: true } })).data,
}));
