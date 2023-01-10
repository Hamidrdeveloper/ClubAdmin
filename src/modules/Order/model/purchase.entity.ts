import { Currency } from '@modules/Currency/model/currency.entity';
import { Language } from '@modules/Language/model/language.entity';
import { PaymentMethod } from '@modules/PaymentMethod';
import { PaymentTerm } from '@modules/PaymentTerm/model/paymentTerm.entity';
import { ProductVariation } from '@modules/Product/model/ProductVariation.entity';
import { ShippingProfile } from '@modules/ShippingProfile/model/shippingProfile.entity';
import { StorageVariation } from '@modules/Stock/model/storageVariation';
import { Country } from '@src/modules/Country';
import { Coupon } from '@src/modules/Coupon';
import { EmailDocumentType } from '@src/modules/Email/model/email.entity';
import { Flag } from '@src/modules/Flag/model/flag.entity';
import { Package } from '@src/modules/Package';
import { Partner } from '@src/modules/Partner';
import { Supplier } from '@src/modules/Supplier';
import { User } from '@src/modules/User';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';
import { Moment } from 'moment';

import { Vat } from '..';

export interface PurchaseOverviewModel {
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
}

export interface PurchaseInfoModel {
  checkoutDate: Date | null;
  customerName: string;
  customerId: number;
  sponsor?: { id: number; name: string };
  estimatedShippingDate: Date | null;
  ipAddress: string;
  orderSaleId: number;
}

export interface PurchaseSettingModel {
  country: Country | null;
  currency: Currency | null;
  shippedOn: Date | null;
  estimatedShippingDate: Date | null;
  shippingCostValue: number;
  termOfPayment: PurchaseSettingTermOfPayment;
  selects: PurchaseSettingModelSelects;
}

export interface PurchaseSettingModelSelects {
  orderStatus: PurchaseStatus;
  language: Language;
  paymentMethod: PaymentMethod;
  shippingProfile: ShippingProfile;
}

export interface PurchaseReceiptsPure {
  id: number;
  order_id: number;
  created_at: string;
  document_type_id: number;
  file_id: number;
  link: string;
  number: number;
  updated_at: string;
  documentType: PurchaseReceiptsDocumentType;
}

export interface PurchaseReceiptsModel {
  invoice_id: number | null;
  documents: PurchaseReceiptsPure[];
}

interface PurchaseReceiptsDocumentType {
  id: number;
  name: string | null;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface PurchaseDocumentsModel {
  options: PurchaseReceiptsOptions;
  documents: PurchaseDocuments[];
}

interface PurchaseReceiptsOptions {
  invoiceId: number | null;
  orderSaleId: number;
}

export interface PurchaseDocuments {
  id: number;
  createDate: Date | null;
  fileURL: string | null;
  name: string;
  number: number;
}

export interface PurchaseReceiptsModalFields {
  number: number;
  comment: string;
  createDate: Moment | Date;
  ChangePurchaseStatusTo: PurchaseStatus;
  bookOutGoingItem: 'YES' | 'NO';
}

// NOTE: formCtx -> what we send to the server
export interface PurchaseReceiptsFormContext {
  OrderDocument?: Partial<PurchaseReceiptsModalFields>;
  order_status_id?: number;
  invoice_type: string;
}

export interface PurchaseEmailsModalFields {
  customer_email: string;
  subject: string;
  body: string;
}

export interface PurchaseEmailsSentHistory {
  id: number;
  body: string;
  order_id: number;
  recipient: string[];
  subject: string;
}

export interface PurchaseSettingTermOfPayment {
  earlyPaymentDiscount: string;
  earlyPaymentDiscountPercent: string;
  paymentDue: string;
  valueDate: Date | null;
}

export interface PurchaseSalePositionPure {
  id: number;
  country_variation_vat_id: number;
  created_at: string;
  customer_reference: string;
  description: string;
  data_current: { name: string } | null | undefined;
  delivered_quantity: number;
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
  storageVariation: StorageVariation | null;
  storage_variation_id: number | null;
  single_gross_amount: number;
  updated_at: string;
  vat_id: number;
  vat_value: number;
  vat: Vat;
  orderPositionType: PurchaseType;
  productVariation: ProductVariation;
  weight_gross: number;
}

export interface PurchaseSalePositionModel {
  createdAt: string;
  discount: number;
  deliveredQuantity?: number;
  grossPrice: number;
  estimatedDeliveryDate: Date | null;
  iso3: string;
  netPrice: number;
  orderId: number;
  parentId: number | null;
  productId: number | null;
  quantity: number;
  returnOnSale: number;
  singleGrossPrice: number;
  singleNetPrice: number;
  updatedAt: Date | null;
  weight: number;
  storageVariation: StorageVariation | null;
  productVariation: PurchaseSalePositionProductVariationModel;
  orderPositionType: PurchaseType;
  vat: Vat;
}

interface PurchaseSalePositionProductVariationModel {
  availableUntil: Date | null;
  deliveryDate: Date | null;
  id: number;
  name: string;
  number: string;
  shippingName: string;
}

interface PurchaseType {
  id: number;
  name: string;
}

export interface PurchaseHistoryPure {
  id: number;
  created_at: Date | string;
  event: 'updated' | 'created' | null;
  ip_address: string;
  url: string | null;
  user_agent: string | null;
  user_id: number;
  new_values: PurchaseHistoryValue;
  old_values: PurchaseHistoryValue;
  user: User;
}

export interface PurchaseHistoryValue {
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

export interface PurchaseSalePure {
  id: number;
  created_at: string;
  shipped_on: string;
  delivery_contact_group_id: number;
  description: string;
  early_payment_discount_days: number;
  early_payment_discount_percentage: number;
  estimate_delivery_date: string;
  estimate_payment_date: string;
  gross_shipping_amount: number;
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
  product_variations_gross_amount: number;
  remaining_price: number;
  return_on_sale: number;
  shipping_profile_id: number;
  total_gross_amount: number;
  total_net_amount: number;
  total_vat_amount: number;
  total_payment: number;
  total_pending: number;
  total_price: number;
  updated_at: string;
  user_id: number;
  vat_value: number;
  currency: Currency;
  coupon: Coupon[];
  deliveryContactGroup: PurchaseContactGroup | null;
  flags: Flag[];
  invoiceContactGroup: PurchaseContactGroup | null;
  language: Language;
  orderStatus: PurchaseStatus;
  owner: PurchaseOwner;
  paymentMethod: PaymentMethod;
  paymentTerm: PaymentTerm;
  shippingProfile: ShippingProfile;
  supplier: Supplier;
  orderComments?: PurchaseComment[];
  orderDocuments: PurchaseReceiptsPure[] | null;
  orderPurchasePositions: PurchaseSalePositionPure[];
  partner: Partner;
  total_weight_gross: number;
  user: User;
  company_id: number;
}

export interface PurchaseComment {
  id: number;
  owner_id: number;
  description: string;
  created_at: string;
}

export interface PurchaseEmails {
  name: string;
}

export interface PurchaseStatus {
  id: number;
  color: string;
  name: string;
}

export interface PurchasePartner {
  id: number;
  user: PurchasePartnerUser;
}

interface PurchasePartnerUser {
  name: string;
}

export interface PurchaseOwner {
  username: string;
  person: PurchasePerson;
}

interface PurchasePerson {
  first_name: string;
  last_name: string;
}

export interface PurchaseContactGroup {
  id: number;
  address: PurchaseContactGroupAddress;
  country: PurchaseContactGroupCountry;
  people: PurchaseContactGroupPeople[];
}

export interface PurchaseContactGroupAddress {
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

interface PurchaseContactGroupCountry {
  name: string;
}

interface PurchaseContactGroupPeople {
  company_name: string | null;
  first_name: string | null;
  last_name: string | null;
}

export interface PurchasePaymentPure {
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

export interface PurchasePaymentFormContext {
  type: string;
  received_at: Date;
  currency: Currency;
  description: string;
  price_value: number;
  exchange_rate: number;
  payment_method: PaymentMethod;
}

export interface PurchasePaymentFormContextArgs extends PurchasePaymentFormContext {
  currency_id: number;
  payment_method_id: number;
}

export interface PurchasePaymentModel {
  paid: string;
  total: string;
  pending: string;
  payment_method: PaymentMethod;
}

export interface PurchaseFlag {
  id: number;
  name: string;
}

export interface PurchaseVat {
  id: number;
  number?: string;
  value: number;
}

export interface EditPurchase {
  name: string;
  price_value: number;
  vat_value: number;
  quantity: number;
  estimate_delivery_date: string;
}

export interface PurchaseCustomerModel {
  email: string;
  username: string;
  gender: string;
  lastName: string;
  firstName: string;
  companyName: string;
  taxNumber: string;
  vatNumber: string;
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

export interface PurchaseCreditGenerateModalFields {
  positions: PurchaseCreditGenerate[];
}

export interface PurchaseUploadDocument {
  file_id: number;
  number: string;
  document_type: EmailDocumentType;
}

export interface PurchaseUploadDocumentContext {
  file_id: number;
  number: string;
  document_type_id: number;
}

interface PurchaseCreditGenerate {
  createdAt: Date | null;
  isActive: boolean;
  orderName: string;
  orderPositionId: number;
  priceValue: number;
  quantity: number;
  vat: Vat;
}

export interface PurchaseCreditGenerateModalContext {
  positions: PurchaseCreditGenerateContext[];
}

interface PurchaseCreditGenerateContext {
  order_position_id: number;
  price_value: number;
  quantity: number;
  vat_id: number;
}

export interface PurchaseSplitModalFields {
  positions: PurchaseSplit[];
}

interface PurchaseSplit {
  isActive: boolean;
  orderName: string;
  orderPositionId: number;
  quantity: number;
}

export interface PurchaseSplitModalContext {
  positions: PurchaseSplitContext[];
}

interface PurchaseSplitContext {
  id: number;
  quantity: number;
}

export interface PurchasePacking {
  id: number;
  description: string | null;
  created_by: number;
  package_id: number;
  number: string;
  weight: string;
  package: Package;
}

export interface PurchaseDeliveryModalContext {
  description: string;
  package_id: number;
  items: {
    product_variation_id: number;
    quantity: number;
  }[];
}

export interface PurchaseDeliveryModalFields {
  description: string;
  package: Package | null;
  items: {
    product_variation_id: number;
    quantity: number;
    name: string;
    isActive: boolean;
  }[];
}
