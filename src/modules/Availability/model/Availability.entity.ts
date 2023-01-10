import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface Availability {
  id: number;
  name: string;
  file: string;
  file_id: number;
  average_days: number;
  translate: GeneralTranslate[] | TranslateContext;
 
}
