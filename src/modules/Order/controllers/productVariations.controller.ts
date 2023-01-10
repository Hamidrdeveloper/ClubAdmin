import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';

import { getProductVariations } from '../services/productVariations.service';

export const getProductVariationsForAdd = async (
  filter: Record<string, any>,
): Promise<ProductVariation[]> => {
  return await getProductVariations(filter);
};
