import { Currency } from '@src/modules/Currency';
import { Supplier } from '@src/modules/Supplier';
import { Unit } from '@src/modules/Unit';

interface VariationSupplierPure {
  id: number;
  supplier_id: number;
  product_variation_id: number;
  supplier_product_number: string;
  supplier_product_name: string;
  price_value: number | undefined;
  delivery_days: number | undefined;
  minimum_quantity: number | undefined;
}
export interface VariationSupplier extends VariationSupplierPure {
  supplier: Supplier | null;
  unit: Unit | null;
  currency: Currency;
}

export interface VariationSupplierCtx extends VariationSupplierPure {
  price_id: number;
  supplier_id: number;
  unit_id: number;
  currency_id: number;
}
