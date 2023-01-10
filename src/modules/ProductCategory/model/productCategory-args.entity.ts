import { ProductCategoryPure } from './productCategory.entity';

export interface ProductCategoryFormContext extends ProductCategoryPure {
  parent_id: number | null;
}
