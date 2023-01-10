import { Currency } from '@modules/Currency/model/currency.entity';
import { Language } from '@modules/Language/model/language.entity';
import { PaymentMethod } from '@modules/PaymentMethod';
import { PaymentTerm } from '@modules/PaymentTerm/model/paymentTerm.entity';
import { ProductVariation } from '@modules/Product/model/ProductVariation.entity';
import { ShippingProfile } from '@modules/ShippingProfile/model/shippingProfile.entity';
import { StorageVariation } from '@modules/Stock/model/storageVariation';
import { Country } from '@src/modules/Country';
import { Coupon } from '@src/modules/Coupon';
import { Flag } from '@src/modules/Flag/model/flag.entity';
import { Package } from '@src/modules/Package';
import { Partner } from '@src/modules/Partner';
import { Referrer } from '@src/modules/Referrer';
import { Subdomain } from '@src/modules/Subdomain';
import { User } from '@src/modules/User';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';
import { Moment } from 'moment';

import { Vat } from '..';

export interface SubscriptionOverviewModel {
  amountPaid: number;
  grossValueOfItems: number;
  iso3: string;
  itemQuantity: number;
  netValueOfItems: number;
  returnOnSale: number;
  shippingCosts: number;
  subscriptionDate: Date | string;
  totalPrice: number;
  weight: number;
  wholeVat: number;
  totalQv: number;
  totalProvisionPrice: number;
  totalProvisionPriceDiscount: number;
}

export interface SubscriptionInfoModel {
  checkoutDate: Date | null;
  customerName: string;
  estimatedShippingDate: Date | null;
  ipAddress: string;
  orderSaleId: number;
}

export interface SubscriptionSettingModel {
  shippedOn: Date | null;
  country: Country | null;
  currency: Currency | null;
  estimatedShippingDate: Date | null;
  timePeriod: number | null;
  shippingCostValue: number;
  termOfPayment: SubscriptionSettingTermOfPayment;
  selects: SubscriptionSettingModelSelects;
}

export interface SubscriptionSettingModelSelects {
  orderStatus: SubscriptionStatus;
  language: Language | null;
  paymentMethod: PaymentMethod | null;
  shippingProfile: ShippingProfile | null;
}

export interface SubscriptionReceiptsPure {
  id: number;
  order_id: number;
  created_at: string;
  document_type_id: number;
  file_id: number;
  link: string;
  number: number;
  updated_at: string;
  documentType: SubscriptionReceiptsDocumentType;
}

export interface SubscriptionReceiptsModel {
  invoice_id: number | null;
  documents: SubscriptionReceiptsPure[];
}

interface SubscriptionReceiptsDocumentType {
  id: number;
  name: string | null;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface SubscriptionDocumentsModel {
  options: SubscriptionReceiptsOptions;
  documents: SubscriptionDocuments[];
}

interface SubscriptionReceiptsOptions {
  invoiceId: number | null;
  orderSaleId: number;
}

export interface SubscriptionDocuments {
  id: number;
  createDate: Date | null;
  fileURL: string | null;
  name: string;
  number: number;
}

export interface SubscriptionReceiptsModalFields {
  number: number;
  comment: string;
  createDate: Moment | Date;
  ChangeSubscriptionStatusTo: SubscriptionStatus;
  bookOutGoingItem: 'YES' | 'NO';
}

// NOTE: formCtx -> what we send to the server
export interface SubscriptionReceiptsFormContext {
  OrderDocument?: Partial<SubscriptionReceiptsModalFields>;
  order_status_id?: number;
  invoice_type: string;
}

export interface SubscriptionEmailsModalFields {
  customer_email: string;
  subject: string;
  body: string;
}

export interface SubscriptionEmailsSentHistory {
  id: number;
  body: string;
  order_id: number;
  recipient: string[];
  subject: string;
}

export interface SubscriptionSettingTermOfPayment {
  earlyPaymentDiscount: string;
  earlyPaymentDiscountPercent: string;
  paymentDue: string;
  valueDate: Date | null;
}

export interface SubscriptionSalePositionPure {
  id: number;
  country_variation_vat_id: number;
  created_at: string;
  customer_reference: string;
  description: string;
  data_current: { name: string } | null | undefined;
  discount: number;
  estimate_delivery_date: string | null;
  ext_position_number: string;
  gross_amount: number;
  total_gross_amount: number;
  net_amount: number;
  order_position_type_id: number;
  order_sale_id: number;
  parent_id: number | null;
  price_id: number;
  price_value: number;
  product_variation_id: number;
  quantity: number;
  return_on_sale: number;
  sort: number;
  single_gross_amount: number;
  storageVariation: StorageVariation | null;
  storage_variation_id: number | null;
  updated_at: string;
  vat_id: number;
  vat_value: number;
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
  vat: Vat;
  orderPositionType: SubscriptionType;
  productVariation: ProductVariation;
}

export interface SubscriptionSalePositionModel {
  careerStepDiscount: number;
  createdAt: string;
  discount: number;
  estimatedDeliveryDate: Date | null;
  grossPrice: number;
  iso3: string;
  netPrice: number;
  orderId: number;
  parentId: number | null;
  percentageOfProvision: number;
  productId: number | null;
  provisionPrice: number;
  quantity: number;
  returnOnSale: number;
  singleGrossPrice: number;
  singleNetPrice: number;
  updatedAt: Date | null;
  weight: number;
  storageVariation: StorageVariation | null;
  productVariation: SubscriptionSalePositionProductVariationModel;
  orderPositionType: SubscriptionType;
  vat: Vat;
}

interface SubscriptionSalePositionProductVariationModel {
  availableUntil: Date | null;
  deliveryDate: Date | null;
  id: number;
  name: string;
  number: string;
  shippingName: string;
}

interface SubscriptionType {
  id: number;
  name: string;
}

export interface SubscriptionHistoryPure {
  id: number;
  created_at: Date | string;
  event: 'updated' | 'created' | null;
  ip_address: string;
  url: string | null;
  user_agent: string | null;
  user_id: number;
  new_values: SubscriptionHistoryValue;
  old_values: SubscriptionHistoryValue;
  user: User;
}

export interface SubscriptionHistoryValue {
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

export interface SubscriptionSalePure {
  id: number;
  created_at: string;
  delivery_contact_group_id: number;
  description: string;
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
  is_editable: boolean;
  language_id: number;
  last_order_sale_date: Date | null;
  next_order_sale_date: Date;
  net_price: number;
  number: string;
  order_advance_id: number;
  order_date: string;
  order_multiple_id: number;
  order_offer_id: number;
  order_status_id: number;
  owner_id: number;
  partner_id: number;
  pay_date: string;
  payment_method_id: number;
  payment_status: string;
  payment_term_id: number;
  product_variations_net_value: number;
  product_variations_gross_value: number;
  remaining_price: number;
  return_on_sale: number;
  shipping_profile_id: number;
  total_gross_amount: number;
  time_period: number | null;
  total_net_amount: number;
  total_vat_amount: number;
  total_payment: number;
  total_price: number;
  // #1 MLM
  total_qv: number;
  total_provision_price: number;
  total_provision_price_discount: number;
  price_percentage_discount: {
    percentage_of_provision: number;
    total: number;
  }[];
  // #1
  updated_at: string;
  user_id: number;
  vat_value: number;
  currency: Currency | null;
  deliveryContactGroup: SubscriptionContactGroup | null;
  invoiceContactGroup: SubscriptionContactGroup | null;
  language: Language | null;
  orderStatus: SubscriptionStatus;
  owner: SubscriptionOwner | null;
  paymentMethod: PaymentMethod | null;
  paymentTerm: PaymentTerm | null;
  referrer: Referrer | null;
  shippingProfile: ShippingProfile | null;
  subdomain: Subdomain | null;
  user: User;
  coupon: Coupon[];
  flags: Flag[];
  orderComments?: SubscriptionComment[];
  orderDocuments: SubscriptionReceiptsPure[] | null;
  positions: SubscriptionSalePositionPure[];
  partner: Partner;
  total_weight_gross: number;
  company_id: number;
}

export interface SubscriptionComment {
  id: number;
  owner_id: number;
  description: string;
  created_at: string;
}

export interface SubscriptionEmails {
  name: string;
}

export interface SubscriptionStatus {
  id: number;
  color: string;
  name: string;
}

export interface SubscriptionPartner {
  id: number;
  user: SubscriptionPartnerUser;
}

interface SubscriptionPartnerUser {
  name: string;
}

export interface SubscriptionOwner {
  username: string;
  person: SubscriptionPerson;
}

interface SubscriptionPerson {
  first_name: string;
  last_name: string;
}

export interface SubscriptionContactGroup {
  id: number;
  address: SubscriptionContactGroupAddress;
  country: SubscriptionContactGroupCountry;
  people: SubscriptionContactGroupPeople[];
}

export interface SubscriptionContactGroupAddress {
  id: number;
  additional: string | null;
  address_complete: string;
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

interface SubscriptionContactGroupCountry {
  name: string;
}

interface SubscriptionContactGroupPeople {
  company_name: string | null;
  first_name: string | null;
  last_name: string | null;
}

export interface SubscriptionPaymentPure {
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

export interface SubscriptionPaymentFormContext {
  type: string;
  received_at: Date;
  currency: Currency;
  description: string;
  price_value: number;
  exchange_rate: number;
  payment_method: PaymentMethod;
}

export interface SubscriptionPaymentFormContextArgs extends SubscriptionPaymentFormContext {
  currency_id: number;
  payment_method_id: number;
}

export interface SubscriptionPaymentModel {
  paid: string;
  total: string;
  pending: string;
  payment_method: PaymentMethod | null;
}

export interface SubscriptionFlag {
  id: number;
  name: string;
}

export interface SubscriptionVat {
  id: number;
  number?: string;
  value: number;
}

export interface EditSubscription {
  name: string;
  price_value: number;
  vat_value: number;
  quantity: number;
  estimate_delivery_date: string;
}

export interface SubscriptionCustomerModel {
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
  creditLimit?: number;
  shippingMethod: string;
  paymentTerm: PaymentTerm | null;
  roles: string[];
  userDiscount: number;
}

export interface SubscriptionCreditGenerateModalFields {
  positions: SubscriptionCreditGenerate[];
}

interface SubscriptionCreditGenerate {
  createdAt: Date | null;
  isActive: boolean;
  orderName: string;
  orderPositionId: number;
  priceValue: number;
  quantity: number;
  vat: Vat;
}

export interface SubscriptionCreditGenerateModalContext {
  positions: SubscriptionCreditGenerateContext[];
}

interface SubscriptionCreditGenerateContext {
  order_position_id: number;
  price_value: number;
  quantity: number;
  vat_id: number;
}

export interface SubscriptionSplitModalFields {
  positions: SubscriptionSplit[];
}

interface SubscriptionSplit {
  isActive: boolean;
  orderName: string;
  orderPositionId: number;
  quantity: number;
}

export interface SubscriptionSplitModalContext {
  positions: SubscriptionSplitContext[];
}

interface SubscriptionSplitContext {
  id: number;
  quantity: number;
}

export interface SubscriptionPacking {
  id: number;
  description: string | null;
  created_by: number;
  package_id: number;
  number: string;
  weight: string;
  package: Package;
}

export interface SubscriptionDeliveryModalContext {
  description: string;
  package_id: number;
  number: string;
  items: {
    product_variation_id: number;
    quantity: number;
  }[];
}

export interface SubscriptionDeliveryModalFields {
  description: string;
  package: Package | null;
  number: string;
  items: {
    product_variation_id: number;
    quantity: number;
    name: string;
    isActive: boolean;
  }[];
}
