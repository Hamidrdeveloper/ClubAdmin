import { UserType } from '@modules/UserType';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface AdditionalBonusPure {
  id: number;
  min_point: number;
  critic_type: string;
  critic_value: number;
  time_period: number;
  translate?: GeneralTranslate[] | TranslateContext;
}

export interface AdditionalBonus extends AdditionalBonusPure {
  userType: UserType;
}
