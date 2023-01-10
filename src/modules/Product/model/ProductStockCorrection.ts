export interface StockCorrection {
  id: number;
  storage_variation_id: number;
  product_variation_id: number;
  quantity: number;
  purchase_quantity: number;
  picked_quantity: number;
  packed_quantity: number;
  reserved_quantity: number;
  delta_quantity: number;
}

export interface StockCorrectionFormCtx {
  quantity: number;
}
