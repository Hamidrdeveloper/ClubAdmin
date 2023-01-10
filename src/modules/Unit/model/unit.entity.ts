import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface Unit {
  id: number;
  name: string;
  slug: string;
  symbol: string;
  translate: GeneralTranslate[] | TranslateContext;
}
