import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface PaymentTerm {
  id: number;
  description: string;
  due_days: number;
  discount_percentage: number;
  translate: GeneralTranslate[] | TranslateContext;
}
