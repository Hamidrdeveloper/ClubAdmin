import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface Language {
  id: number;
  title: string;
  locale: string;
  is_ltr: boolean;
  is_default: boolean;
  is_active: boolean;
  translate: GeneralTranslate[] | TranslateContext;
}
