import { ResponseContext } from '@shared/models';
import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import axios, { AxiosResponse } from 'axios';

export const getShopVariations = async (
  userId: number | undefined,
  search: string,
): Promise<ResponseContext<ProductVariation[]>> => {
  try {
    const response: AxiosResponse<ResponseContext<ProductVariation[]>> = await axios.get(
      '/shop/product-variations/list',
      {
        params: { isActive: true, userId: userId, search: search },
      },
    );

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
