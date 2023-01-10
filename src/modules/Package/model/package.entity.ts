import { PackingType } from '@modules/PackingType/model/packingType.entity';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface PackagePure {
  id: number;
  height: number;
  length: number;
  width: number;
  net_weight: number;
  gross_weight: number;
  packing_type_id: number;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface Package extends PackagePure {
  packingType: PackingType;
}
