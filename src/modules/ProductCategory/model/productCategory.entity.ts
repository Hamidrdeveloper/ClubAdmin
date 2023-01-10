import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface ProductCategoryPure {
  id: number;
  name: string;
  slug: string;
  sort: number;
  partner_id: number;
  subdomain_id: number;
  show_in_header: boolean;
  show_in_website: boolean;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface ProductCategory extends ProductCategoryPure {
  parent: ProductCategory;
  children: ProductCategory[];
}
