import { PackagePure } from './package.entity';

export interface PriceFormContext extends PackagePure {
  packing_type_id: number;
}
