import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { OrderVat } from '../../model/order.entity';
import { OrderVatChildModule } from '../../Order.module';

const orderVatStore = atom([]);
const validFromDate = atom(new Date());
export const validFromDateOrderVat = atom(
  (get) => get(validFromDate),
  (get, set, newDate) => {
    set(validFromDate, newDate);
  },
);
const countryId = atom('');
export const countryIdOrderVat = atom(
  (get) => get(countryId),
  (get, set, newCountry) => {
    set(countryId, newCountry);
  },
);
const module = new OrderVatChildModule();

export const orderVatAtom = atomWithQuery((get) => ({
  queryKey: ['OrderVat', get(orderVatStore)],
  queryFn: async (): Promise<OrderVat[]> =>
    (
      await module.apiService.getAll({
        pagination: { per_page: 100 },
        params: {
          isActive: true,
          countryId: countryIdOrderVat.read(get),
          validFromLessThan: validFromDateOrderVat.read(get),
        },
      })
    ).data,
}));
