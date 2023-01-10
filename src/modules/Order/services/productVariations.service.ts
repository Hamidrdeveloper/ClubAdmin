import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { ApiBuilder } from '@src/shared/utils';
import axios, { AxiosResponse } from 'axios';

const productVarAPI = new ApiBuilder<ProductVariation>('/product-variations');

export const getProductVariations = async (filter: Record<string, any>): Promise<ProductVariation[]> => {
  try {
    return (await productVarAPI.getAll({ params: filter })).data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getShopVariationsBySearch = async (
  search: string,
  signal: AbortSignal,
): Promise<ProductVariation[]> => {
  try {
    const response: AxiosResponse<{ data: ProductVariation[] }> = await axios.get(
      '/shop/product-variations',
      {
        signal,
        params: { page: 1, per_page: 3, search: search !== '' ? search : undefined },
      },
    );

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
