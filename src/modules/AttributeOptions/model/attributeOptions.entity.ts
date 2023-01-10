import { AttributeTypesPure } from '@src/modules/AttributeType';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface AttributeOptionsPure {
  id: number;
  value: string;
  sort: null | number;
  file_id: null | number;
  file_path: null | string;
  attribute_type_id: number;
  translate: GeneralTranslate[] | TranslateContext;
}
export interface AT_Options extends AttributeOptionsPure {
  attributeType: AttributeTypesPure;
}
