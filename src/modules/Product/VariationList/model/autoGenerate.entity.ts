import { AT_Options } from '@src/modules/AttributeOptions/model/attributeOptions.entity';
import { AttributeTypes } from '@src/modules/AttributeType';

export interface VariationAutoGenerate {
  attributes: { attributeType: AttributeTypes; attributeTypeOption: AT_Options[] }[];
}

export interface VariationAutoGenerateFormCtx {
  //  e.g: [[1, 2], [3, 4], [5, 6]];
  attributeTypeOptions: number[][];
}
