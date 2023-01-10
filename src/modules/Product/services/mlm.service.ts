import { ResponseContext } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import axios, { AxiosResponse } from 'axios';

import { VariationMLM } from '../model/VariationMLM.entity';

// TODO: translate
export const variationMLMApi = new ApiBuilder<VariationMLM>(
  'product-variation-mlm-details',
  'Product Variation MLM Details',
);
export async function getVariationMLM(variationId: number): Promise<VariationMLM[]> {
  try {
    const data: ResponseContext<VariationMLM[]> = await variationMLMApi.getAll({
      params: { productVariationId: variationId },
    });
    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function removeVariationMLMOption(mlmId: number): Promise<number> {
  try {
    const response: AxiosResponse = await axios.delete(`product-variation-mlm-details/${mlmId}`);

    return response.status;
  } catch (e) {
    throw new Error(e);
  }
}
