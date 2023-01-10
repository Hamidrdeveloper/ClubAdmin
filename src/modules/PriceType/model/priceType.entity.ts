import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface PriceType {
  id: number;
  name: string;
  translate: GeneralTranslate[] | TranslateContext;
}
