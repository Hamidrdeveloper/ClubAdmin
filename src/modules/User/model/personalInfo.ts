import { CareerStepModel } from '@src/modules/Competition/model/CareerStep.entity';
import { Country } from '@src/modules/Country';
import { CustomerStepModel } from '@src/modules/CustomerStep/model/CustomerStep.entity';
import { Flag } from '@src/modules/Flag/model/flag.entity';
import { Language } from '@src/modules/Language';
import { Partner } from '@src/modules/Partner';
import { PaymentMethodType } from '@src/modules/PaymentMethodType';
import { PaymentTerm } from '@src/modules/PaymentTerm';
import { Role } from '@src/modules/Role';
import { ShippingMethod } from '@src/modules/ShippingMethod';
import { UserType } from '@src/modules/UserType';

import { Address } from './address';

// What we receive from server
export interface UserPure {
  id: number;
  email: string;
  avatar: string;
  username: string;
  created_at: Date;
  updated_at: Date;
  sponsor_id: number;
  vat_number: number;
  is_active: boolean;
  partner_id: number;
  tax_number: string;
  eori_number: string;
  credit_limit: number;
  is_vat_valid: boolean;
  discount_ratio: number;
  birth_date: string | Date | null;
  use_gln_indocuments: boolean;
  communication_by_letter: boolean;
  two_factor_enable: boolean;
  telephone_number: string;

  //   NOTE: base on mock data we recieve these fields as well
  point: number;
  file_id: number;
  customer_step_id: number;
  payment_method_id: number;
  default_payment_terms_id: number;
  invoice_contact_group_id: number;
  default_shipping_method_id: number;
}
export interface User extends UserPure {
  flag: Flag;
  roles: Role[];
  country: Country;
  sponsor: Partner;
  partner: Partner;
  person: PersonCtx;
  language: Language;
  userType: UserType;
  paymentTerm: PaymentTerm;
  careerStep: CareerStepModel;
  shippingMethod: ShippingMethod;
  customerStep: CustomerStepModel;
  paymentMethod: PaymentMethodType;
}

// note: this is the backend data structure problem, they need to fix it.
// we receive roles as Array of role object, but actually user roles is a single role object in that array. and users can only have one role. so in this case we have to override our formModel to normalize this data.
export interface UserPersonalInfoFormModel extends Omit<User, 'roles'> {
  roles: Role[] | Role;
}

export interface Sponsor {
  // NOTE: sponsor is not ready from backend
  id: number;
}

export interface Person {
  id: number;
  gender: string;
  last_name: string;
  first_name: string;
  created_by: number;
  company_name: string;
  full_name: string;
}

export interface PersonCtx extends Person {
  contactGroups: ContactGroups[];
}

export interface ContactGroups {
  id: number;
  title: string;
  country: Country;
  address: Address;
  last_name: string;
  first_name: string;
  country_id: number;
  addresses: Address[];
  company_name: string;
  emails: { email: string }[];
  websites: { type: string; url: string }[];
  phones: { type: string; number: string }[];
  translate: [{ locale: string; title: string }];
}

// What we send to the server
export interface UserFormCtx extends UserPure {
  people: Person;
  roles: number[];
  flag_id: number;
  people_id: number;
  sponsor_id: number;
  country_id: number;
  language_id: number;
  user_type_id: number;
}

export interface UserToggler {
  is_active: boolean;
}

export interface OrderFormCtx {
  user_id: number;
}

export interface SubscriptionFormCtx {
  user_id: number;
  invoice_contact_group_id: number;
}

export interface OrderPartnerFormCtx {
  partner_id: number;
  customer_id: number;
}
