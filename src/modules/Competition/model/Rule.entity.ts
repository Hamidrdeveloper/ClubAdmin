import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { User } from '@src/modules/User';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

import { CareerStepModel } from './CareerStep.entity';
import { CompetitionModel } from './Competition.entity';
import { RuleTypeModel } from './RulesType.entity';

interface RulePure {
  id: number;
  title: string;
  points: number;
  updated_at: string;
  created_at: string;
  description: string;
  is_editable: boolean;
  competition_id: number;
  translations: TranslateContext | GeneralTranslate[];
}

export interface RuleModel extends RulePure {
  achieveCareerStep: CareerStepModel;
  productVariations: ProductVariation[];
  competition: CompetitionModel;
  competitionRuleType: RuleTypeModel;
  // We dont actually get this field from api, we just have it in our form
  blocked_users: User[];
  careerSteps: CareerStepModel[];
}

export interface RuleFormCtx extends RulePure {
  competition_id: number;
  competition_rule_type_id: number;
  product_variation_ids: number[];
  achieve_career_step_id: number;
  career_step_ids: number[] | null;
  translate?: TranslateContext | GeneralTranslate[];
}
