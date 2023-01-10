import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface UserType {
  id: number;
  name: string;
  discount_percentage: number;
  min_point: number;
  bonus_type: 'percentage' | 'point';
  bonus_value: number;
  is_generation: boolean | string;
  is_partner: boolean | string;
  period_type: 'day' | 'month' | 'year';
  min_period: number;
  with_number_of_generations: number;
  sale_system_id: number;
  translate: GeneralTranslate[] | TranslateContext;
}
