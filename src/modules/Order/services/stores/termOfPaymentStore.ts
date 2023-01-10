import { ApiBuilder } from '@src/shared/utils';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { OrderTermOfPayment } from '../../model/order.entity';

const orderTermOfPaymentStore = atom([]);

const module = new ApiBuilder<OrderTermOfPayment>('/payment-terms');

export const orderTermOfPaymentAtom = atomWithQuery((get) => ({
  queryKey: ['OrderTermOfPayment', get(orderTermOfPaymentStore)],
  queryFn: async (): Promise<OrderTermOfPayment[]> =>
    (
      await module.getAll({
        pagination: { per_page: 1000 },
        params: { isActive: true },
      })
    ).data,
}));
