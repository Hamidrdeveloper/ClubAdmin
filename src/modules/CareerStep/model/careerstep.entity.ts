import { GeneralTranslate, TranslateContext } from '@src/shared/models';
export interface CareerStep {
  id: number;
  slug: string;
  min_point: number;
  is_generation: boolean;
  voucher_level: number;
  id_account_minus_value: string;
  name: string;
  discount_percentage: string;
  frontline: number;
  translate: GeneralTranslate[] | TranslateContext;
}
