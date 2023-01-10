import { FinalBasketWithId, FinalOrderWithUserId, FinalizedBasket, OrderSale } from '@modules/Order';
import axios, { AxiosResponse } from 'axios';

export const bulkAdd = async (items: FinalBasketWithId): Promise<FinalizedBasket | undefined> => {
  try {
    const response: AxiosResponse<Promise<FinalizedBasket | undefined>> = await axios.post(
      '/basket/bulk-add',
      items,
    );

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const finalizeOrder = async (
  order: FinalOrderWithUserId,
): Promise<{ orderSale: OrderSale; paymentLink: string }> => {
  try {
    const response: AxiosResponse<Promise<{ orderSale: OrderSale; paymentLink: string }>> = await axios.post(
      '/order-sales/basket',
      order,
    );

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
