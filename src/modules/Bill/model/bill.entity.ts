import { CareerStepModel } from '@src/modules/Competition/model/CareerStep.entity';
import { Country } from '@src/modules/Country';
import { Currency } from '@src/modules/Currency';
import { PaymentMethod } from '@src/modules/PaymentMethod';
import { ContactGroups, User } from '@src/modules/User';

type SDate = string | Date | null;
export interface BillPosition {
  id: number;
  type_id: number;
  type: { name: string };
  buyer_id: number | null;
  buyer: User | null;
  bill_id: number;
  bill: Bill;
  order_id: number;
  amount: number;
  factor: number;
  currency_id: number | null;
  currency: Currency | null;
}

export interface ABill {
  id: number;
  bill_number_generated: string | null;
  created_at: SDate;
  from: SDate;
  hidden: number;
  name: string;
  promotion_executed: SDate;
  to: SDate;
  updated_at: SDate;
}

export interface Bill {
  id: number;
  abill_id: number;
  career_step_id: number | null;
  career_step: CareerStepModel | null;
  company_name?: string | null; // TODO: Remove ? after data being provided!
  contact_group_id: number | null;
  contact_group: ContactGroups | null;
  country_id: number | null;
  country: Country | null;
  currency: Currency;
  factor: number | null;
  first_name: string;
  gender: string | null;
  iban: string | null;
  is_paid: boolean;
  last_name: string;
  number: number;
  pay_date: SDate | null;
  payment_method_id: number | null;
  payment_method: PaymentMethod | null;
  swift: string;
  tax_number: string;
  total_amount: number;
  user_id: number | null;
  user: User | null;
  vat_id: number | null;
  vat_percent: number | null;
  vat: number | null;
  is_approved: boolean;
}

export interface ABillCreationModel {
  to: string;
  name: string;
  from: string;
  execute_at: string | undefined;
}
