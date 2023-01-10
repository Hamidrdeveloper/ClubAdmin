import { SortOrder } from '@src/shared/models';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { ProductCategory } from '../model/productCategory.entity';
import ProductCategoryModule from '../ProductCategory.module';

const productCategoryStore = atom([]);
const module = new ProductCategoryModule();

export const productCategoryAtom = atomWithQuery((get) => ({
  queryKey: ['productCategory', get(productCategoryStore)],
  queryFn: async (): Promise<ProductCategory[]> => {
    return (
      await module.apiService.getAll({
        pagination: { per_page: 68 },
        params: { isActive: true, orderBy: { 'translation.name': SortOrder.ASC }, show_in_website: true },
      })
    ).data;
  },
}));
