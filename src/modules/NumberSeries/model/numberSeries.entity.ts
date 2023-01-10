import { CompanyModel } from '@src/modules/Company/model/company.entity';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface NumberSeries {
  id: number;
  name: string;
  description: string;
  type_id: number;
  date_order: boolean;
  active_manual: boolean;
  numberSeriesType: NumberSeriesType;
  numberSeriesPositions: NumberSeriesPositions[];
  translate: GeneralTranslate[] | TranslateContext;
}

export interface NumberSeriesType {
  id: number;
  slug: string;
}

export interface NumberSeriesPositions {
  id: number;
  available_from: Date;
  company: CompanyModel;
  starting_number: number;
  ending_number: number;
  warning_number: number;
  increment_by_number: number;
  allow_gaps: boolean;
  last_number: number;
  prefix: string;
  is_default: boolean;
}

export interface NumberSeriesSelectPositions {
  id: number;
  number_series_id: number;
  available_from: Date;
  starting_number: number;
  ending_number: number | null;
  warning_number: number;
  increment_by_number: number;
  allow_gaps: boolean;
  last_number: number;
  created_at: Date;
  updated_at: Date;
  prefix: string | null;
  is_default: boolean;
  number_series: NumberSeriesPure;
}

export interface NumberSeriesPure {
  id: number;
  date_order: boolean;
  active_manual: boolean;
  created_at: Date;
  updated_at: Date;
  type_id: number;
  name: string;
}
