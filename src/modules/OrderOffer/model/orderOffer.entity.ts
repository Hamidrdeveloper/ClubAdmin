export interface OrderOffer {
  id: number;
  user_id: number;
  partner_id: number;
  number: string;
  customer_reference: string;
  invoice_contact_group_id: number;
  delivery_contact_group_id: number;
  description: string;
  order_date: string;
  payment_method_id: number;
  payment_term_id: number;
  estimate_delivery_date: string;
  valid_until: string;
  estimate_payment_date: string;
  early_payment_discount_days: number;
  early_payment_discount_percentage: number;
  language_id: number;
  orderOfferPosition: [];
}
