import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface CustomTariff {
  id: number;
  value: number;
  number: number;
  translate: GeneralTranslate[] | TranslateContext;
}
