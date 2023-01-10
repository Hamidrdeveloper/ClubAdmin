import { Currency } from '@src/modules/Currency';
import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { Supplier } from '@src/modules/Supplier';

import { StorageVariation } from './storageVariation';

export interface IncomingItemsPure {
  order_id: number | null;
  order_type: string | null;
  description: string;
  reason: string;
  delivery_date: string | Date;
}
export interface IncomingItems extends IncomingItemsPure {
  items: [Items];
}
export interface IncomingItemsFormCtx extends IncomingItemsPure {
  items: [Partial<ItemsFormCtx>];
}

interface ItemsPure {
  quantity: number;
  batch: string;
  expire_date: string | Date;
  purchase_price: number;
  exchange_rate: number;
}
interface Items extends ItemsPure {
  product_variation: ProductVariation;
  storage_variation: StorageVariation;
  currency: Currency;
  supplier: Supplier;
}

export interface ItemsFormCtx extends ItemsPure {
  currency_id: number;
  supplier_id: number;
  product_variation_id: number;
  storage_variation_id: number;
}
