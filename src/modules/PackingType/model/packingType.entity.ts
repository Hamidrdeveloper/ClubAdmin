import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface PackingType {
  id: number;
  name: string;
  translate: GeneralTranslate[] | TranslateContext;
}
