import { Country } from '@src/modules/Country';
import { User } from '@src/modules/User';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

interface CompetitionPure {
  id: number;
  title: string;
  status: string;
  is_active: boolean;
  updated_at: string;
  created_at: string;
  has_ended: boolean;
  activable: boolean;
  description: string;
  is_editable: boolean;
  release_date: string;
  file_id: number | null;
  is_participant: boolean;
  available_until: string;
  must_accept_terms: boolean;
}
export interface CompetitionModel extends CompetitionPure {
  translations: TranslateContext | GeneralTranslate[];
}

export interface CopyCompetitionModel extends CompetitionModel {
  status_humanize: string;
}
export interface CompetitionFormCtx extends CompetitionPure {
  translate: TranslateContext | GeneralTranslate[];
}

export interface FullCompetitionModel extends CompetitionModel {
  country_list: Country[];
  blacklist_users: User[];
  must_accept_terms: boolean;
}

export interface FullCompetitionFormCtx extends CompetitionFormCtx {
  country_ids: number[];
  user_ids: number[];
  must_accept_terms: boolean;
}
