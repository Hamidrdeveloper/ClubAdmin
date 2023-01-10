import { GeneralTranslate, TranslateContext } from '@src/shared/models';
export interface CustomerStepModel {
  id: number;
  name: string;
  slug: string;
  frontline: number;
  voucher_level: number;
  id_account_minus_value: number | null;
  translate: GeneralTranslate[] | TranslateContext;
}
