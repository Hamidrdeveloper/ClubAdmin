import { ApiBuilder } from '@src/shared/utils';

import { VariationAutoGenerateFormCtx } from '../model/autoGenerate.entity';

export const autoGenerateService = (
  productId: number | string,
  values: VariationAutoGenerateFormCtx,
): Promise<unknown> => {
  // TODO: translate
  const API = new ApiBuilder(`products/${productId}/auto-generate-variation`, 'Auto Generate Variation');
  try {
    return API.createOne(values);
  } catch (e) {
    throw new Error(e);
  }
};
