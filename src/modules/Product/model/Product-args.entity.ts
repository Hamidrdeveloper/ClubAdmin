import { ProductPure } from './Product.entity';

export interface ProductFormContext extends ProductPure {
  product_category_ids: number[];
  release_date: string | Date;
  available_until: string | Date;
}
