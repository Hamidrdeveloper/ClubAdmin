import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';

import { StorageVariation } from './storageVariation';

interface InventoryPure {
  id: number;
  storage_variation_id: number;
  product_variation_id: number;
  quantity: number;
  purchase_quantity: number;
  picked_quantity: number;
  packed_quantity: number;
  reserved_quantity: number;
  delta_quantity: number;
  min_storage_quantity: number;
  // For tooltips
  info: Record<string, string>;
}

export interface Inventory extends InventoryPure {
  productVariation: ProductVariation;
}
export interface InventoryFormFields {
  product_variation: ProductVariation;
  storage_variation: StorageVariation;
}
