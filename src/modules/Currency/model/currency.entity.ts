import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface Currency {
  id: number;
  name: string;
  iso3: string;
  ratio: number;
  symbol: string;
  is_active: boolean | string;
  is_default: boolean | string;
  translate: GeneralTranslate[] | TranslateContext;
}
