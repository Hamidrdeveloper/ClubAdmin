import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface VariationCategoryPure {
  id: number;
  name: string;
  partner_id: number;
  subdomain_id: number;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface VariationCategory extends VariationCategoryPure {
  parent: VariationCategory;
}
