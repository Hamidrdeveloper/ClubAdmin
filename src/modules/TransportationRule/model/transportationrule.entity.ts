import { Country } from '@src/modules/Country';

export interface TransportationRule {
  id: number;
  country_id: number;
  min_partner_amount: number;
  partner_cost: number;
  min_customer_amount: number;
  customer_cost: boolean;
  country: Country;
}
