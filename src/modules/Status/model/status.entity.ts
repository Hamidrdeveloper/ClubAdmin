import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface Status {
  id: number;
  number: number;
  color: string;
  translate: GeneralTranslate[] | TranslateContext;
}
