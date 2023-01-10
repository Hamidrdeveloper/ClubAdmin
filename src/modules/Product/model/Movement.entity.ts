export interface MovementJournals {
  id: number;
  type: string;
  reason: string;
  description: string;
  created_at: string | Date;
  items: Items[];
}

export interface Items {
  id: number;
  quantity: number;
  exchange_rate: number;
  purchase_price: number;
  batch: string;
  created_at: Date | string;
  updated_at: Date | string;
  expire_date: Date | string;
  outgoing_journal_id: number;
  product_variation_id: number;
  storage_variation_id: number;
}

export { Items as MovementJournalsItem };
