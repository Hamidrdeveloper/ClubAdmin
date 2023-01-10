import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface ShippingMethod {
  id: number;
  name: string;
  translate: GeneralTranslate[] | TranslateContext;
}
