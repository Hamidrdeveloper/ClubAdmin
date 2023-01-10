import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface RuleTypeModel {
  id: number;
  slug: string;
  title: string;
  description: string;
  translations: TranslateContext | GeneralTranslate[];
}
