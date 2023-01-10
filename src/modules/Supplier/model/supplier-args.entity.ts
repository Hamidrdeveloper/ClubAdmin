import { SupplierPure } from '../model/supplier.entity';

export interface SupplierFormContext extends SupplierPure {
  people_id: number;
  default_payment_terms_id: number;
  default_shipping_method_id: number;
}
