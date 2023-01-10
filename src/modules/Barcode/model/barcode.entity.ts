import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface Barcode {
  id: number;
  type: string;
  value: string;
  used: boolean;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface BarcodeGenerateModel {
  type: string;
  from: number;
  to: number;
  prefix: string;
  postfix: string;
  used: false;
}
