import { VariationCategoryPure } from './variationCategory.entity';

export interface VariationCategoryFormContext extends VariationCategoryPure {
  parent_id: number | null;
}
