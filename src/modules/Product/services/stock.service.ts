import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';

// TODO: unknown => Stock
const stockAPI = new ApiBuilder<unknown>('/STOCKAPI', i18n.t('Product.Stock.Title'));
// TODO: unknown => Stock? (maybe something else but probably Stock | Correction)
export const getAllCorrection = async (): Promise<unknown> => {
  try {
    // TODO: unknown => Stock
    const response = await stockAPI.getAll({});

    return response;
  } catch (err) {
    throw new Error(err);
  }
};
