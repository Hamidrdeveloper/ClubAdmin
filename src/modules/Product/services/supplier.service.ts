import i18n from '@src/core/i18n/config';
import { ResponseContext } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

import { VariationSupplier } from '../model/VariationSupplier.entity';

const API = new ApiBuilder<VariationSupplier>(
  'product-variation-suppliers',
  i18n.t('Product.Variation.Suppliers.ProductVariationSupplier'),
);
export async function getVariationSupplier(variationId: number): Promise<VariationSupplier[]> {
  try {
    const data: ResponseContext<VariationSupplier[]> = await API.getAll({
      params: { productVariationId: variationId },
    });

    return data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export const deleteSingleVariationSupplier = async (id: number): Promise<number> => {
  try {
    const response: AxiosResponse = await axios.delete(`product-variation-suppliers/${id}`);

    message.success(
      i18n.t('Global.DeletedSuccessfully', { title: i18n.t('Product.Variation.Suppliers.Title') }),
    );
    return response.status;
  } catch (e) {
    throw new Error(e);
  }
};

export { API as ProductVariationSupplierAPI };
