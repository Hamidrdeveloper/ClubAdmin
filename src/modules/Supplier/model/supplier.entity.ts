import { Flag } from '@src/modules/Flag/model/flag.entity';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

import { PaymentTerm } from '../../PaymentTerm';
import { ShippingMethod } from '../../ShippingMethod';
import { ContactGroups, User } from '../../User/model/personalInfo';

export interface SupplierPure {
  id: number;
  // if its a user it means a supplier is also a user and can login
  is_user: boolean;
  tax_number: string;
  vat_number: string;
  is_vat_valid: boolean;
  eori_number: string;
  credit_limit: number;
  use_gln_indocuments: boolean;
  first_name?: string;
  last_name?: string;
  gender: string;
  company_name: string;
  communication_by_letter: boolean;
  letter_price: number;
  user: {
    email: string;
    username: string;
    password: string;
    telephone_number: string;
    id: number | undefined;
    is_active: boolean | undefined;
  };
  people: People;
  contact_group_id: number | null;
  contactGroup: ContactGroups | null;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface Supplier extends SupplierPure {
  flags: Flag[];
  paymentTerm: PaymentTerm;
  shippingMethod: ShippingMethod;
}

export interface People {
  id: number;
  last_name: string;
  first_name: string;
  full_name: string;
  gender: string;
  company_name: string;
  user: User;
}
