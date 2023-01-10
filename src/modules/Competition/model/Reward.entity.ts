import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { User } from '@src/modules/User';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

import { CompetitionModel } from './Competition.entity';

interface RewardModelPure {
  id: number;
  description: string;
  points: number;
  type: string;
  amount: number;
  is_editable: boolean;
  updated_at: string;
  created_at: string;
}
export interface RewardModel extends RewardModelPure {
  competition: CompetitionModel;
  productVariations: ProductVariation[];
  translations: TranslateContext | GeneralTranslate[];
}
export interface RewardFormCtx extends RewardModelPure {
  competition_id: number;
  translate: TranslateContext | GeneralTranslate[];
  product_variation_ids: number[];
}

interface RewarTranslation {
  competition_reward_id: number;
  locale: string;
  description: string;
}
interface CompetitionRewardModel extends RewardModelPure {
  competition_id: number;
  translations: RewarTranslation[];
}

export interface UserRewardModel {
  user_id: number;
  competition_reward_id: number;
  user: User;
  competitionReward: CompetitionRewardModel;
}
