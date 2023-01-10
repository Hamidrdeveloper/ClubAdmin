import { Currency } from '@modules/Currency/model/currency.entity';
import { Language } from '@modules/Language/model/language.entity';
import { PPD, Vat } from '@modules/Order';
import { PaymentMethod } from '@modules/PaymentMethod';
import { PaymentTerm } from '@modules/PaymentTerm/model/paymentTerm.entity';
import { ShippingProfile } from '@modules/ShippingProfile/model/shippingProfile.entity';
import { Country } from '@src/modules/Country';
import { Coupon } from '@src/modules/Coupon';
import { Flag } from '@src/modules/Flag/model/flag.entity';
import { Package } from '@src/modules/Package';
import { Partner } from '@src/modules/Partner';
import { Referrer } from '@src/modules/Referrer';
import { Subdomain } from '@src/modules/Subdomain';
import { User } from '@src/modules/User';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

import { OrderStatus } from './order.entity';

export interface EditPartnerOrder {
  id: number;
  vat_value: number;
  vat_id: number;
  quantity: number;
  name: string;
  price_value: number;
  unit_id: number;
  description: string;
}

export interface PartnerOverviewModel {
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
  userDiscount: string;
}

export interface PartnerInfoModel {
  checkoutDate: Date | null;
  customerName: string;
  customerId: number;
  sponsor?: { id: number; name: string };
  estimatedShippingDate: Date | null;
  ipAddress: string;
  orderSaleId: number;
}

export interface PartnerSettingModel {
  country: Country | null;
  currency: Currency | null;
  estimatedShippingDate: Date | null;
  shippingCostValue: number;
  termOfPayment: PartnerSettingTermOfPayment;
  selects: PartnerSettingModelSelects;
}

export interface PartnerSettingModelSelects {
  partnerStatus: null;
  language: Language | null;
  paymentMethod: PaymentMethod | null;
  shippingProfile: ShippingProfile | null;
}

export interface PartnerReceiptsPure {
  id: number;
  partner_id: number;
  created_at: string;
  document_type_id: number;
  file_id: number;
  link: string;
  number: number;
  updated_at: string;
  documentType: PartnerReceiptsDocumentType;
}

export interface PartnerReceiptsModel {
  invoice_id: number | null;
  documents: PartnerReceiptsPure[];
}

interface PartnerReceiptsDocumentType {
  id: number;
  name: string | null;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface PartnerDocumentsModel {
  options: PartnerReceiptsOptions;
  documents: PartnerDocuments[];
}

interface PartnerReceiptsOptions {
  invoiceId: number | null;
  orderSaleId: number;
}

export interface PartnerDocuments {
  id: number;
  createDate: Date | null;
  fileURL: string | null;
  name: string;
  number: number;
}

export interface PartnerReceiptsModalFields {
  comment: string;
}

// NOTE: formCtx -> what we send to the server
export interface PartnerReceiptsFormContext {
  PartnerDocument?: Partial<PartnerReceiptsModalFields>;
  partner_status_id?: number;
  invoice_type: string;
}

export interface PartnerEmailsModalFields {
  customer_email: string;
  subject: string;
  body: string;
}

export interface PartnerEmailsSentHistory {
  id: number;
  body: string;
  partner_id: number;
  recipient: string[];
  subject: string;
}

export interface PartnerSettingTermOfPayment {
  earlyPaymentDiscount: string;
  earlyPaymentDiscountPercent: string;
  paymentDue: string;
  valueDate: Date | null;
}

export interface PartnerSalePositionPure {
  created_at: string;
  description: string;
  gross_amount: number;
  id: number;
  net_amount: number;
  order_partner_id: number;
  price_value: number;
  quantity: number;
  unit_id: number;
  updated_at: string;
  vat_amount: number;
  vat_id: number;
  vat_value: number;
}

export interface PartnerSalePositionModel {
  created_at: string;
  description: string;
  gross_amount: number;
  id: number;
  net_amount: number;
  order_partner_id: number;
  price_value: number;
  quantity: number;
  unit_id: number;
  updated_at: string;
  vat_amount: number;
  vat_id: number;
  vat_value: number;
}

export interface PartnerHistoryPure {
  id: number;
  created_at: Date | string;
  event: 'updated' | 'created' | null;
  ip_address: string;
  url: string | null;
  user_agent: string | null;
  user_id: number;
  new_values: PartnerHistoryValue;
  old_values: PartnerHistoryValue;
  user: User;
}

export interface PartnerHistoryValue {
  id: number;
  currency_id: number | null;
  delivery_contact_group_id: number | null;
  estimate_delivery_date: string | null;
  invoice_contact_group_id: number | null;
  ip: string | null;
  language_id: number | null;
  number: string | null;
  partner_date: string | null;
  partner_status_id: number | null;
  payment_method_id: number | null;
  shipping_profile_id: number | null;
  user_id: number | null;
}

export interface PartnerSalePure {
  id: number;
  created_at: string;
  delivery_contact_group_id: number;
  description: string;
  user_discount?: string;
  early_payment_discount_days: number;
  early_payment_discount_percentage: number;
  estimate_delivery_date: string;
  estimate_payment_date: string;
  gross_shipping_cost: number;
  has_partner_credit_note: boolean;
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
  partner_advance_id: number;
  partner_date: string;
  partner_multiple_id: number;
  partner_offer_id: number;
  partner_status_id: number;
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
  orderStatus: OrderStatus;
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
  deliveryContactGroup: PartnerContactGroup | null;
  invoiceContactGroup: PartnerContactGroup | null;
  language: Language | null;
  partnerStatus: PartnerStatus;
  owner: PartnerOwner | null;
  paymentMethod: PaymentMethod | null;
  paymentTerm: PartnerTermOfPayment | null;
  referrer: Referrer | null;
  shippingProfile: ShippingProfile | null;
  subdomain: Subdomain | null;
  user: User;
  coupon: Coupon[];
  flags: Flag[];
  partnerComments?: PartnerComment[];
  orderDocuments: PartnerReceiptsPure[] | null;
  orderPartnerPositions: PartnerSalePositionPure[];
  partner: Partner;
  total_weight_gross: number;
  company_id: number;
}

export interface PartnerComment {
  id: number;
  owner_id: number;
  description: string;
  created_at: string;
}

export interface PartnerEmails {
  name: string;
}

export interface PartnerStatus {
  id: number;
  color: string;
  name: string;
}

export interface PartnerPartner {
  id: number;
  user: PartnerPartnerUser;
}

interface PartnerPartnerUser {
  name: string;
}

export interface PartnerOwner {
  username: string;
  person: PartnerPerson;
}

interface PartnerPerson {
  first_name: string;
  last_name: string;
}

export interface PartnerContactGroup {
  id: number;
  address: PartnerContactGroupAddress;
  country: PartnerContactGroupCountry;
  people: PartnerContactGroupPeople[];
}

export interface PartnerContactGroupAddress {
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

interface PartnerContactGroupCountry {
  name: string;
}

interface PartnerContactGroupPeople {
  company_name: string | null;
  first_name: string | null;
  last_name: string | null;
}

export interface PartnerPaymentPure {
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

export interface PartnerPaymentFormContext {
  type: string;
  received_at: Date;
  currency: Currency;
  description: string;
  price_value: number;
  exchange_rate: number;
  payment_method: PaymentMethod;
}

export interface PartnerPaymentFormContextArgs extends PartnerPaymentFormContext {
  currency_id: number;
  payment_method_id: number;
}

export interface PartnerPaymentModel {
  paid: string;
  total: string;
  pending: string;
  payment_method: PaymentMethod | null;
}

export interface PartnerFlag {
  id: number;
  name: string;
}

export interface PartnerVat {
  id: number;
  number?: string;
  value: number;
}

export interface EditPartner {
  name: string;
  price_value: number;
  vat_value: number;
  quantity: number;
  estimate_delivery_date: string;
}

export interface PartnerCustomerModel {
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

export interface PartnerCreditGenerateModalFields {
  positions: PartnerCreditGenerate[];
}

interface PartnerCreditGenerate {
  createdAt: Date | null;
  isActive: boolean;
  partnerName: string;
  partnerPositionId: number;
  priceValue: number;
  quantity: number;
  vat: Vat;
}

export interface PartnerCreditGenerateModalContext {
  positions: PartnerCreditGenerateContext[];
}

interface PartnerCreditGenerateContext {
  partner_position_id: number;
  price_value: number;
  quantity: number;
  vat_id: number;
}

export interface PartnerSplitModalFields {
  positions: PartnerSplit[];
}

interface PartnerSplit {
  isActive: boolean;
  partnerName: string;
  partnerPositionId: number;
  quantity: number;
}

export interface PartnerSplitModalContext {
  positions: PartnerSplitContext[];
}

interface PartnerSplitContext {
  id: number;
  quantity: number;
}

export interface PartnerPacking {
  id: number;
  description: string | null;
  created_by: number;
  package_id: number;
  number: string;
  weight: string;
  package: Package;
}

export interface PartnerDeliveryModalContext {
  description?: string;
  package_id: number;
  number?: string;
  items: {
    product_variation_id: number;
    quantity: number;
  }[];
}

export interface PartnerDeliveryModalFields {
  description?: string;
  package: Package | null;
  number?: string | undefined;
  items: {
    product_variation_id: number;
    quantity: number;
    name: string;
    isActive: boolean;
  }[];
}

export interface PartnerTermOfPayment {
  id: number;
  due_days: number;
  discount_percentage: number;
  discount_days?: number;
  value_date?: Date | string | null;
  description: string;
}
