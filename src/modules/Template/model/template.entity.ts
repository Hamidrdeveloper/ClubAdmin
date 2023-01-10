import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface Template {
  id: number;
  slug: string;
  created_by: number;
  title: string;
  body: string;
  summary: string;
  translate: GeneralTranslate[] | TranslateContext;
}
