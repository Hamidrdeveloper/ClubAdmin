import { Currency } from '@modules/Currency/model/currency.entity';
import { Language } from '@modules/Language/model/language.entity';
import {
  CreditPaymentPure,
  CreditSalePure,
  PartnerDocumentsModel,
  PartnerOverviewModel,
  PartnerPaymentPure,
  PartnerSalePure,
  PurchaseDocumentsModel,
  PurchaseOverviewModel,
  PurchasePaymentPure,
  PurchaseSalePositionModel,
  PurchaseSalePure,
} from '@modules/Order';
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
import { ContactGroups, User } from '@src/modules/User';
import { GeneralTranslate, SortOrder, TranslateContext } from '@src/shared/models';
import { Moment } from 'moment';

import {
  SubscriptionDocumentsModel,
  SubscriptionOverviewModel,
  SubscriptionPaymentPure,
  SubscriptionSalePositionModel,
} from './sub.entity';
import { CreditDocumentsModel, CreditOverviewModel, CreditSalePositionModel, SubscriptionSalePure } from '..';

export interface OrderOverviewModel {
  amountPaid: number;
  grossValueOfItems: number;
  iso3: string;
  itemQuantity: number;
  netValueOfItems: number;
  returnOnSale: number;
  shippingCosts: number;
  totalPrice: number;
  weight: number;
  wholeVat: number;
  totalQv: number;
  totalProvisionPrice: number;
  totalProvisionPriceDiscount: number;
}

export interface OrderInfoModel {
  checkoutDate: Date | null;
  customerName: string;
  customerId: number;
  sponsor?: { id: number; name: string };
  estimatedShippingDate: Date | null;
  lastOrderSaleDate?: Date | null;
  nextOrderSaleDate?: Date;
  ipAddress: string;
  orderSaleId: number;
  ppd: PPD[];
}

export interface OrderSettingModel {
  shippedOn: Date | null;
  country: Country | null;
  currency: Currency | null;
  estimatedShippingDate: Date | null;
  shippingCostValue: number;
  termOfPayment: OrderSettingTermOfPayment;
  selects: OrderSettingModelSelects;
}

export interface OrderSettingModelSelects {
  orderStatus: OrderStatus;
  language: Language | null;
  paymentMethod: PaymentMethod | null;
  shippingProfile: ShippingProfile | null;
}

export interface OrderReceiptsPure {
  id: number;
  order_id: number;
  created_at: string;
  document_type_id: number;
  file_id: number;
  link: string;
  number: number;
  updated_at: string;
  documentType: OrderReceiptsDocumentType;
}

export interface OrderReceiptsModel {
  invoice_id: number | null;
  documents: OrderReceiptsPure[];
}

interface OrderReceiptsDocumentType {
  id: number;
  name: string | null;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface OrderDocumentsModel {
  options: OrderReceiptsOptions;
  documents: OrderDocuments[];
}

interface OrderReceiptsOptions {
  invoiceId: number | null;
  orderSaleId: number;
}

export interface OrderDocuments {
  id: number;
  createDate: Date | null;
  fileURL: string | null;
  name: string;
  number: number;
}

export interface OrderReceiptsModalFields {
  number: number;
  comment: string;
  createDate: Moment | Date;
  ChangeOrderStatusTo: OrderStatus;
  bookOutGoingItem: 'YES' | 'NO';
}

// NOTE: formCtx -> what we send to the server
export interface OrderReceiptsFormContext {
  OrderDocument?: Partial<OrderReceiptsModalFields>;
  order_status_id?: number;
  invoice_type: string;
}

export interface OrderEmailsModalFields {
  customer_email: string;
  subject: string;
  body: string;
  template_id: number;
  language?: string;
}

export interface OrderEmailsSentHistory {
  id: number;
  body: string;
  order_id: number;
  recipient: string[];
  subject: string;
}

export interface OrderSettingTermOfPayment {
  earlyPaymentDiscount: string;
  earlyPaymentDiscountPercent: string;
  paymentDue: string;
  valueDate: Date | null;
}

export interface OrderSalePositionPure {
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
  weight_gross: number;
  serial_number: string[] | null;
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
  orderPositionType: OrderType;
  productVariation: ProductVariation;
  children: OrderSalePositionPure[];
}

export interface OrderSalePositionModel {
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
  productVariation: OrderSalePositionProductVariationModel;
  orderPositionType: OrderType;
  vat: Vat;
}

export interface Vat {
  id: number;
  number: string;
  valid_from: string;
  value: number;
}

interface OrderSalePositionProductVariationModel {
  availableUntil: Date | null;
  deliveryDate: Date | null;
  id: number;
  name: string;
  number: string;
  shippingName: string;
}

export interface OrderType {
  id: number;
  name: string;
}

export interface OrderHistoryPure {
  id: number;
  created_at: Date | string;
  event: 'updated' | 'created' | null;
  ip_address: string;
  url: string | null;
  user_agent: string | null;
  user_id: number;
  new_values: OrderHistoryValue;
  old_values: OrderHistoryValue;
  user: User;
}

export interface OrderHistoryValue {
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

export interface OrderSalePure {
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
  return_on_sale: number;
  shipping_profile_id: number;
  total_gross_amount: number;
  total_net_amount: number;
  total_vat_amount: number;
  total_pending: number;
  total_payment: number;
  total_price: number;
  // #1 MLM
  total_qv: number;
  total_provision_price: number;
  total_provision_price_discount: number;
  price_percentage_discount: PPD[];
  // #1
  updated_at: string;
  user_id: number;
  vat_value: number;
  currency: Currency | null;
  country: Country | null;
  deliveryContactGroup: OrderContactGroup | null;
  invoiceContactGroup: OrderContactGroup | null;
  language: Language | null;
  orderStatus: OrderStatus;
  owner: OrderOwner | null;
  paymentMethod: PaymentMethod | null;
  paymentTerm: OrderTermOfPayment | null;
  referrer: Referrer | null;
  shippingProfile: ShippingProfile | null;
  subdomain: Subdomain | null;
  user: User;
  coupon: Coupon[];
  flags: Flag[];
  orderComments?: OrderComment[];
  orderDocuments: OrderReceiptsPure[] | null;
  orderSalePositions: OrderSalePositionPure[];

  customer_first_name: string;
  customer_last_name: string;
  customer_full_name: string;
  lastPaymentDate: string | Date;
  total_weight_net: number;
  total_weight_gross: number;
  remaining_price: number;
  subdomain_id: number;
  referrer_id: number;
  order_subscription_id: number;
  invoice_number: string | number;
  invoice_cancellation_number: null;
  dunning_level_id: number;
  order_credit_note_ids: [];
  company_id: number;
  author_id: number;
  career_step_id: number;
  factor: string;
  early_payment_discount: number;
  early_payment_date: Date | string;
  delivery_note_link: string | null;
  pick_list_document_link: string | null;
  _data: unknown;
  partner: Partner;
  total_quantity: number;
}
export interface PPD {
  percentage_of_provision: number;
  total: number;
}

export interface OrderComment {
  id: number;
  owner_id: number;
  description: string;
  created_at: string;
}

export interface OrderEmails {
  name: string;
}

export interface OrderStatus {
  id: number;
  color: string;
  name: string;
}

export interface OrderPartner {
  id: number;
  user: OrderPartnerUser;
}

interface OrderPartnerUser {
  name: string;
}

export interface OrderOwner {
  username: string;
  person: OrderPerson;
}

interface OrderPerson {
  first_name: string;
  last_name: string;
}

export interface OrderContactGroup {
  id: number;
  address: OrderContactGroupAddress;
  country: OrderContactGroupCountry;
  people: OrderContactGroupPeople[];
}

export interface OrderContactGroupAddress {
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

interface OrderContactGroupCountry {
  name: string;
}

interface OrderContactGroupPeople {
  company_name: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
}

export interface RequestParams {
  page?: number;
  per_page?: number;
  search?: string;
  orderBy: OrderBy;
}

interface OrderBy {
  id: SortOrder;
}

export interface OrderPaymentPure {
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

export interface OrderPaymentFormContext {
  type: string;
  received_at: Date;
  currency: Currency | null;
  description: string;
  price_value: number;
  exchange_rate: number;
  payment_method: PaymentMethod;
}

export interface OrderPaymentFormContextArgs extends OrderPaymentFormContext {
  currency_id: number;
  payment_method_id: number;
}

export interface OrderPaymentModel {
  paid: string;
  total: string;
  pending: string;
  payment_method: PaymentMethod | null;
}

export interface OrderFlag {
  id: number;
  name: string;
}

export interface OrderVat {
  id: number;
  number?: string;
  value: number;
}

export interface EditOrder {
  name: string;
  price_value: number;
  vat_value: number;
  quantity: number;
  estimate_delivery_date: string;
}

export interface OrderCustomerModel {
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

export interface OrderCreditGenerateModalFields {
  positions: OrderCreditGenerate[];
}

interface OrderCreditGenerate {
  createdAt: Date | null;
  isActive: boolean;
  orderName: string;
  orderPositionId: number;
  priceValue: number;
  quantity: number;
  vat: Vat;
}

export interface OrderCreditGenerateModalContext {
  positions: OrderCreditGenerateContext[];
}

interface OrderCreditGenerateContext {
  order_position_id: number;
  price_value: number;
  quantity: number;
  vat_id: number;
}

export interface OrderSplitModalFields {
  positions: OrderSplit[];
}

interface OrderSplit {
  isActive: boolean;
  orderName: string;
  orderPositionId: number;
  quantity: number;
}

export interface OrderSplitModalContext {
  positions: OrderSplitContext[];
}

interface OrderSplitContext {
  id: number;
  quantity: number;
}

export interface OrderPacking {
  id: number;
  description: string | null;
  created_by: number;
  package_id: number;
  order_id: number;
  number: string;
  weight: string;
  package: Package;
  packingJournalItems: OrderPackingJournalItems[];
}

export interface OrderPackingJournalItems {
  id: number;
  packing_journal_id: number;
  productVariation: ProductVariation;
  product_variation_id: number;
  quantity: number;
  storage_variation_id: number | null;
  order_position_id: number | null;
}
export interface OrderDeliveryModalContext {
  description?: string;
  package_id: number;
  number?: string;
  items: {
    product_variation_id: number;
    order_position_id?: number;
    quantity: number;
  }[];
}
export interface OrderDeliveryModalFields {
  description?: string;
  package: Package | null;
  number?: string;
  items: {
    product_variation_id: number;
    order_position_id: number;
    quantity: number;
    name: string;
    isActive: boolean;
    order_position_type_id: number;
    parent_id: number | null;
  }[];
}

export interface OrderTermOfPayment {
  id: number;
  due_days: number;
  discount_percentage: number;
  discount_days?: number;
  value_date?: Date | string | null;
  description: string;
}

export enum OrderDetailTabs {
  'Overview' = 'Overview',
  'Settings' = 'Settings',
  'Payment' = 'Payment',
  'Receipt' = 'Receipt',
  'Email' = 'Email',
  'Customer' = 'Customer',
  'Tickets' = 'Tickets',
  'Orders' = 'Orders',
  'Stock' = 'Stock',
  'ReOrder' = 'Re-Order',
  'Properties' = 'Properties',
  'Delivery' = 'Delivery',
  'All' = 'All',
}

export type OrderModuleType = 'order-sale' | 'credit' | 'subscription' | 'purchase' | 'partner';
export type OrderSaleType =
  | OrderSalePure
  | CreditSalePure
  | SubscriptionSalePure
  | PurchaseSalePure
  | PartnerSalePure
  | null;
export type OrderDocumentType =
  | OrderDocumentsModel
  | CreditDocumentsModel
  | SubscriptionDocumentsModel
  | PurchaseDocumentsModel
  | PartnerDocumentsModel
  | null;
export type OrderPaymentType =
  | OrderPaymentPure[]
  | CreditPaymentPure[]
  | SubscriptionPaymentPure[]
  | PurchasePaymentPure[]
  | PartnerPaymentPure[];
export type OrderOverviewModelType =
  | OrderOverviewModel
  | CreditOverviewModel
  | SubscriptionOverviewModel
  | PurchaseOverviewModel
  | PartnerOverviewModel
  | null;
export type OrderPositionModelType =
  | OrderSalePositionModel
  | CreditSalePositionModel
  | SubscriptionSalePositionModel
  | PurchaseSalePositionModel;
// | PartnerSalePositionModel;
export type OrderDocumentModelType =
  | OrderDocumentsModel
  | CreditDocumentsModel
  | SubscriptionDocumentsModel
  | PurchaseDocumentsModel
  | PartnerDocumentsModel
  | null;
export type OrderPositionsModelType =
  | OrderSalePositionModel[]
  | CreditSalePositionModel[]
  | SubscriptionSalePositionModel[]
  | PurchaseSalePositionModel[]
  // | PartnerSalePositionModel[]
  | [];

interface CallShipperPackageModel {
  barcode_id: number;
  created_at: string;
  deleted_at: string;
  gross_weight: number;
  height: number;
  id: number;
  length: number;
  net_weight: number;
  packing_type_id: number;
  updated_at: string;
  width: number;
}
export interface OrderCallShipperModel {
  created_at: string;
  created_by: number;
  deleted_at: string;
  description: string;
  id: number;
  number: string;
  order: OrderSaleType;
  order_id: number;
  order_type: string;
  package: CallShipperPackageModel;
  package_id: number;
  partner_id: number;
  updated_at: string;
  weight: string;
}

export interface OrderSaleGroupFunctionFormFields {
  id?: number;
  language_id?: number;
  flag_ids?: number[];
  order_status_id?: number;
  order_ids: number[];
}

export type FinalBasket = { items: { count: number; product_variation_id: number }[] };
export type FinalBasketWithId = { items: { count: number; product_variation_id: number }[]; user_id: number };

export interface FinalizedBasket {
  status: string;
  total_price: number;
  user_id: number;
  user: User;
}

export interface FinalOrder {
  coupon?: string;
  description: string;
  payment_method_id: number;
  shipping_profile_id?: number;
  invoice_contact_group_id: number;
  delivery_contact_group_id: number;
}
export interface FinalOrderWithUserId {
  coupon?: string;
  description: string;
  payment_method_id: number;
  shipping_profile_id?: number;
  invoice_contact_group_id: number;
  delivery_contact_group_id: number;
  user_id: number;
}
export interface OrderSale {
  id: number;
  created_at: string;
  delivery_contact_group_id: number;
  description: string;
  early_payment_discount_days: number;
  early_payment_discount_percentage: number;
  estimate_delivery_date: string;
  estimate_payment_date: string;
  invoice_cancellation_id: number;
  invoice_cancellation_link: string;
  invoice_contact_group_id: number;
  invoice_id: number | null;
  invoice_link: string | null;
  ip: string;
  language_id: number;
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
  remaining_price: number;
  return_on_sale: number;
  shipping_profile_id: number;
  total_price: number;
  updated_at: string;
  user_id: number;
  vat_value: number;
  currency: Currency;
  deliveryContactGroup: ContactGroups;
  invoiceContactGroup: ContactGroups;
  language: Language;
  orderStatus: OrderStatus;
  owner: OrderOwner;
  paymentMethod: PaymentMethod | null;
  paymentTerm: PaymentTerm;
  shippingProfile: ShippingProfile;
  orderSalePositions: OrderSalePositionPure[];
}
