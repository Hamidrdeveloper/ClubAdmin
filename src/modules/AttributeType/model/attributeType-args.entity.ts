import { AttributeTypesPure } from '..';

export interface AttributeTypeFormCtx extends AttributeTypesPure {
  partner_id: number;
  subdomain_id: number;
  product_variation_category_ids: number[] | null;
}
