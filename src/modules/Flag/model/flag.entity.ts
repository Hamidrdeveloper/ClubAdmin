import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface Flag {
  id: number;
  color: string;
  icon: string;
  name: string;
  translate: GeneralTranslate[] | TranslateContext;
}
