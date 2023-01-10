import { Currency } from '@modules/Currency/model/currency.entity';
import { Language } from '@modules/Language/model/language.entity';
import { PaymentMethod } from '@modules/PaymentMethod';
import { PaymentTerm } from '@modules/PaymentTerm/model/paymentTerm.entity';
import { ShippingProfile } from '@modules/ShippingProfile/model/shippingProfile.entity';
import { Country } from '@src/modules/Country';
import { Flag } from '@src/modules/Flag/model/flag.entity';
import { Partner } from '@src/modules/Partner';
import { Referrer } from '@src/modules/Referrer';
import { Subdomain } from '@src/modules/Subdomain';
import { User } from '@src/modules/User';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

import {
  OrderComment,
  OrderContactGroup,
  OrderOwner,
  OrderReceiptsModalFields,
  OrderReceiptsPure,
  OrderSalePositionPure,
  PPD,
  Vat,
} from '..';

export interface CreditOverviewModel {
  amountPaid: number;
  grossValueOfItems: number;
  iso3: string;
  itemQuantity: number;
  netValueOfItems: number;
  returnOnSale: number;
  shippingCosts: number;
  totalPrice: number;
  totalQv: number;
  totalProvisionPrice: number;
  totalProvisionPriceDiscount: number;
  weight: number;
  wholeVat: number;
}

export interface CreditInfoModel {
  shippedOn: Date | null;
  checkoutDate: Date | null;
  customerName: string;
  customerId: number;
  sponsor?: { id: number; name: string };
  estimatedShippingDate: Date | null;
  ipAddress: string;
  orderSaleId: number;
  ppd: PPD[];
}

export interface CreditSettingModel {
  shippedOn: Date | null;
  country: Country | null;
  currency: Currency | null;
  estimatedShippingDate: Date | null;
  shippingCostValue: number;
  termOfPayment: CreditSettingTermOfPayment;
  selects: CreditSettingModelSelects;
}
export interface CreditSettingModelSelects {
  orderStatus: CreditStatus;
  language: Language;
  paymentMethod: PaymentMethod;
  shippingProfile: ShippingProfile;
}

export interface CreditReceiptsPure {
  order_id: number;
  created_at: string;
  document_type_id: number;
  file_id: number;
  link: string;
  number: number;
  updated_at: string;
  documentType: CreditReceiptsDocumentType;
}

export interface CreditReceiptsModel {
  credit_note_document_link: string | null;
  correction_document_link: string | null;
  documents: CreditReceiptsPure[];
}
interface CreditReceiptsDocumentType {
  id: number;
  name: string | null;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface CreditDocumentsModel {
  options: CreditReceiptsOptions;
  documents: CreditDocuments[];
}
interface CreditReceiptsOptions {
  correctionUrl: string | null;
  creditNoteUrl: string | null;
  orderSaleId: number;
}
export interface CreditDocuments {
  id: number;
  createDate: Date | null;
  fileURL: string | null;
  name: string;
  number: number;
}
// NOTE: formCtx -> what we send to the server
export interface CreditReceiptsFormContext {
  OrderDocument?: Partial<OrderReceiptsModalFields>;
  order_status_id?: number;
  invoice_type: string;
}

export interface CreditEmailsModalFields {
  customer_email: string;
  subject: string;
  body: string;
}

export interface CreditEmailsSentHistory {
  id: number;
  body: string;
  order_id: number;
  recipient: string[];
  subject: string;
}

export interface CreditSettingTermOfPayment {
  earlyPaymentDiscount: string;
  earlyPaymentDiscountPercent: string;
  paymentDue: string;
  valueDate: Date | null;
}

export interface CreditSalePositionPure {
  id: number;
  gross_amount: number;
  net_amount: number;
  orderPosition: OrderSalePositionPure;
  order_credit_note_id: number;
  order_position_id: number;
  price_id: number | null;
  price_value: number;
  quantity: number;
  single_gross_amount: number;
  vat_amount: number;
  vat_id: number;
  vat_value: number;
  weight_gross: number;
  // #1 MLM
  orderPositionMlmDetail: {
    id: number;
    has_discount: boolean;
    is_active: boolean;
    bfk: boolean;
    bfo: boolean;
    vpop: boolean;
    bf: number;
    qv: number;
    career_step_discount: number;
    provision_price: number;
    percentage_of_provision: number; //1
  };
  // #1
}

export interface CreditSalePositionModel {
  careerStepDiscount: number;
  createdAt: string;
  discount: number;
  grossPrice: number;
  iso3: string;
  netPrice: number;
  singleGrossPrice: number;
  singleNetPrice: number;
  orderId: number;
  percentageOfProvision: number;
  productId: number | null;
  provisionPrice: number;
  quantity: number;
  returnOnSale: number;
  updatedAt: Date | null;
  weight: number;
  productVariation: CreditSalePositionProductVariationModel;
  vat: Vat;
}

interface CreditSalePositionProductVariationModel {
  availableUntil: Date | null;
  deliveryDate: Date | null;
  id: number;
  name: string;
  number: string;
  shippingName: string;
}

export interface CreditHistoryPure {
  event: string;
  ip_address: string;
  new_values: CreditHistoryValue;
  old_values: CreditHistoryValue;
  user: CreditHistoryUser;
}

interface CreditHistoryUser {
  person: CreditPerson;
}

export interface CreditHistoryValue {
  id: number;
  currency_id: number | null;
  delivery_contact_group_id: number | null;
  estimate_delivery_date: string | null;
  invoice_contact_group_id: number | null;
  ip: string | null;
  language_id: number | null;
  number: string | null;
  order_date: string | null;
  order_status_id: number | null;
  payment_method_id: number | null;
  shipping_profile_id: number | null;
  user_id: number | null;
}

export interface CreditSalePure {
  id: number;
  customer_reference: string | null;
  correction_cancellation_document_link: string | null;
  correction_document_link: string | null;
  created_at: string;
  credit_note_cancellation_document_link: string | null;
  credit_note_document_link: string | null;
  description: string | null;
  isEditable: boolean;
  language_id: number;
  total_pending: number;
  number: string;
  flags: Flag[];
  language: Language;
  orderStatus: CreditStatus;
  paymentMethod: PaymentMethod;
  order: CreditOrderSalePure;
  orderDocuments: OrderReceiptsPure[] | null;
  orderCreditNotePositions: CreditSalePositionPure[];
  order_date: string | null;
  order_status_id: number;
  owner_id: number | null;
  pay_date: string | null;
  payment_method_id: number;
  payment_status: string;
  total_gross_amount: number;
  total_net_amount: number;
  total_payment: number;
  total_vat_amount: number;
  // #1 MLM
  total_qv: number;
  total_provision_price: number;
  total_provision_price_discount: number;
  price_percentage_discount: {
    percentage_of_provision: number;
    total: number;
  }[];
  // #1
  translate: [];
  partner: Partner;
  currency: Currency;
  total_weight_gross: number;
  user: User;
  vat_value: number;
  company_id: number;
}

export interface CreditOrderSalePure {
  id: number;
  created_at: string;
  delivery_contact_group_id: number;
  early_payment_discount_days: number;
  early_payment_discount_percentage: number;
  shipped_on: string;
  estimate_delivery_date: string;
  estimate_payment_date: string;
  gross_shipping_cost: number;
  has_order_credit_note: boolean;
  invoice_cancellation_id: number;
  invoice_cancellation_link: string;
  invoice_contact_group_id: number;
  invoice_id: number | null;
  invoice_link: string | null;
  ip: string;
  net_price: number;
  order_advance_id: number;
  order_multiple_id: number;
  order_offer_id: number;
  partner_id: number;
  payment_term_id: number;
  remaining_price: number;
  return_on_sale: number;
  shipping_profile_id: number;
  total_price: number;
  updated_at: string;
  user_id: number;
  vat_value: number;
  currency: Currency | null;
  country: Country | null;
  deliveryContactGroup: OrderContactGroup | null;
  invoiceContactGroup: OrderContactGroup | null;
  owner: OrderOwner | null;
  paymentTerm: PaymentTerm | null;
  referrer: Referrer | null;
  shippingProfile: ShippingProfile;
  subdomain: Subdomain | null;
  user: User;
  orderComments?: OrderComment[];
  orderDocuments: OrderReceiptsPure[] | null;
  total_weight_gross: number;
}

export interface CreditComment {
  id: number;
  owner_id: number;
  description: string;
  created_at: string;
}
export interface CreditEmails {
  name: string;
}

export interface CreditStatus {
  id: number;
  color: string;
  name: string;
}

export interface CreditPartner {
  id: number;
  user: CreditPartnerUser;
}

interface CreditPartnerUser {
  name: string;
}

export interface CreditOwner {
  username: string;
  person: CreditPerson;
}

interface CreditPerson {
  first_name: string;
  last_name: string;
}

export interface CreditContactGroup {
  id: number;
  address: CreditContactGroupAddress;
  country: CreditContactGroupCountry;
  people: CreditContactGroupPeople[];
}
export interface CreditContactGroupAddress {
  id: number;
  additional: string | null;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  gln_number: any | null;
  house_number: string;
  is_pack_station: boolean;
  is_post_office: boolean;
  latitude: string;
  longitude: string;
  pack_station_number: string | null;
  post_identity: string;
  postal_code: string;
  state: string;
  title: string;
}

interface CreditContactGroupCountry {
  name: string;
}

interface CreditContactGroupPeople {
  company_name: string | null;
  first_name: string | null;
  last_name: string | null;
}

export interface CreditPaymentPure {
  hash: null;
  id: number;
  type: string;
  status: string;
  origin: string;
  received_at: Date;
  imported: boolean;
  processed: boolean;
  description: string;
  price_value: number;
  is_system_currency: boolean;
}

export interface CreditPaymentFormContext {
  type: string;
  received_at: Date;
  currency: Currency;
  description: string;
  price_value: number;
  exchange_rate: number;
  payment_method: PaymentMethod;
}

export interface CreditPaymentFormContextArgs extends CreditPaymentFormContext {
  currency_id: number;
  payment_method_id: number;
}

export interface CreditPaymentModel {
  paid: string;
  total: string;
  pending: string;
  payment_method: PaymentMethod;
}

export interface CreditFlag {
  id: number;
  name: string;
}

export interface CreditVat {
  id: number;
  number?: string;
  value: number;
}

export interface EditCredit {
  name: string;
  price_value: number;
  vat_value: number;
  quantity: number;
  estimate_delivery_date: string;
}

export interface CreditCustomerModel {
  email: string;
  username: string;
  gender: string;
  lastName: string;
  firstName: string;
  companyName: string;
  taxNumber: string;
  vatNumber: number;
  eoriNumber: string;
  country: string;
  language: string;
  paymentMethod: string;
  creditLimit: number;
  shippingMethod: string;
  paymentTerm: PaymentTerm | null;
  roles: string[];
  userDiscount: number;
}
