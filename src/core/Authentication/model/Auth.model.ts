import { Country } from '@src/modules/Country';
import { Language } from '@src/modules/Language';
import { Partner } from '@src/modules/Partner';
import { Supplier } from '@src/modules/Supplier';
import { UserType } from '@src/modules/UserType';

export interface Login {
  user: User;
  token: string;
  message: string;
  token_key: string;
}

export interface UserLoginResponse {
  user: User;
  token: string;
}

// its the response that decides whether the logged in user has 2fa enabled or not
export interface onLoginResponse {
  status: number;
}

export interface LoginForm {
  username: string;
  password: string;

}

export interface TwoFactorVerificationFormCtx {
  token_key: string;
  code: number;
}

interface RegisterPure {
  email: string;
  gender: string;
  password: string;
  birth_date: Date;
  first_name: string;
  last_name: string;
}

export interface RegisterForm extends RegisterPure {
  country_id: number;
  language_id: number;
}

export interface RegisterFormContext extends RegisterPure {
  country: Country;
  language: Language;
}

export type Sponsor = {
  id: number;
  user_id: number;
  left_tree: number;
  right_tree: number;
  bank_name: string;
  iban: string;
  default_warranty_days: number;
  swift: string;
  receive_vat_responsible: boolean;
  send_vat_responsible: boolean;
  active_auto_bonus: boolean;
  active_training_bonus: boolean;
  post_delivery_factor: boolean;
  receive_commission: boolean;
  can_buy: boolean;
  transportation_ratio_percentage: number;
  over_personal_turnover: boolean;
  can_see_down_line: boolean;
  inhouse_sale: boolean;
  has_network: boolean;
  has_btob: boolean;
  has_btoc: boolean;
  has_warehouse: boolean;
  has_delivery: boolean;
  warranty_days: number;
  max_client_root: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_approved: boolean;
  public_findable: boolean;
  country_id: number;
  company_id: number;
  coach_id: number;
  receive_incentive_bonus: boolean;
  is_promotional_article_active: boolean;
  is_full_legals_responsible: boolean;
  has_info_service: boolean;
  fullname: string;
  sponsors_count: number;
  partners_count: number;
  coachs_count: number;
};

export type CareerStep = {
  id: number;
  slug: string;
  voucher_level?: string;
  discount_percentage: number;
};

export interface User {
  id: number;
  avatar: string;
  created_at: Date;
  credit_limit: number;
  default_payment_terms_id: number;
  default_shipping_method_id: number;
  email: string;
  eori_number: string;
  file_id: number;
  is_vat_valid: number;
  invoice_contact_group_id: number;
  payment_method_id: number;
  sponsor: Sponsor;
  tax_number: string;
  updated_at: Date;
  use_gln_indocuments: boolean;
  username: string;
  basket: UserBasket;
  partner: Partner;
  country: Country;
  supplier: Supplier;
  language: Language;
  person: UserPerson;
  userType: UserType;
  roles: UserRole[];
  discount_ratio?: number;
  careerStep?: CareerStep;
  invoiceContactGroup?: {
    id: number;
    address: {
      id: number;
      country: {
        id: number;
        name: string;
        currency: {
          name: string;
          id: number;
          iso3: string;
        };
      };
      title?: string;
      city?: string;
      address_complete?: string;
    };
  };
}

export interface UserConfig {
  transportation_rule: {
    id: number;
    country_id: number;
    min_partner_amount: number;
    partner_cost: number;
    min_customer_amount: number;
    customer_cost: number;
  };
  shipping_cost_rule: {
    id: number;
    country_id: number;
    min_amount: number;
    amount: number;
  };
}

export interface RolePermission {
  id: number;
  title: string;
}

export interface UserRole {
  id: number;
  title: string;
  slug: string;
  owner_visibility: boolean;
  company_visibility: boolean;
  permissions: RolePermission[];
  translate: { locale: string; title: string };
}

interface UserBasket {
  status: string;
  user_id: number;
  total_price: number;
}

interface UserPerson {
  id: number;
  gender: string;
  last_name: string;
  created_by: string;
  first_name: string;
  company_name: string;
}
