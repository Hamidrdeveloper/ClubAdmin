import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { OrderOffer } from '../model/orderOffer.entity';
import OrderOfferModule from '../OrderOffer.module';

const orderOfferStore = atom([]);
const module = new OrderOfferModule();

export const orderOfferAtom = atomWithQuery((get) => ({
  queryKey: ['orderOffer', get(orderOfferStore)],
  queryFn: async (): Promise<OrderOffer[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 90 }, params: { isActive: true } })).data,
}));
