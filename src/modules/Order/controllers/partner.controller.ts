import { PartnerDeliveryModalFields } from '@modules/Order';
import { Country } from '@src/modules/Country';

import { editCreditSalePositions, updateCreditFlags, updateCreditStatus } from '../services/credit.service';
import {
  addPartnerDelivery,
  editPartnerSalePositions,
  generateCreditNote,
  generatePartnerInvoice,
  generatePartnerInvoiceCancellation,
  getOnePartnerDocument,
  getOnePartnerSale,
  splitPartnerSale,
  updatePartnerFlags,
  updatePartnerStatus,
} from '../services/partner.service';
import {
  editSubscriptionSalePositions,
  updateSubscriptionFlags,
  updateSubscriptionStatus,
} from '../services/subscription.service';
import {
  OrderModuleType,
  PartnerCreditGenerateModalFields,
  PartnerCustomerModel,
  PartnerDocuments,
  PartnerDocumentsModel,
  PartnerInfoModel,
  PartnerOverviewModel,
  PartnerPaymentModel,
  PartnerReceiptsFormContext,
  PartnerSalePositionModel,
  PartnerSalePure,
  PartnerSettingModel,
  PartnerSettingModelSelects,
  PartnerSettingTermOfPayment,
  PartnerSplitModalFields,
} from '..';

export const getPartnerSaleDetails = async (order_sale_id: number): Promise<PartnerSalePure | null> =>
  await getOnePartnerSale(order_sale_id);

export const getPartnerOverviewFromPartnerSale = (order: PartnerSalePure): PartnerOverviewModel => {
  const iso3 = order.currency?.iso3 ?? 'EUR';

  const itemQuantity = order.orderPartnerPositions?.map((order) => order.quantity).reduce((a, b) => a + b, 0);
  const weight = 0;

  return {
    amountPaid: order.total_payment ?? 0,
    grossValueOfItems: order.product_variations_gross_value ?? 0,
    iso3,
    itemQuantity,
    netValueOfItems: order.total_net_amount ?? 0,
    returnOnSale: order.return_on_sale ?? 0,
    shippingCosts: order.gross_shipping_cost ?? 0,
    totalPrice: order.total_gross_amount ?? 0,
    weight,
    wholeVat: order.total_vat_amount ?? 0,
    userDiscount: order.user_discount ?? '0',
  };
};

export const getPartnerInfoFromPartnerSale = (order: PartnerSalePure): PartnerInfoModel => {
  const orderSaleId = order.id ?? -1;

  const customerId = order.user ? order.user.id : 0;
  const customerName = order.user ? order.user.person?.first_name + ' ' + order.user.person?.last_name : '-';

  const sponsor = order.user.sponsor ? { id: order.user.sponsor.user_id, name: '' } : undefined;

  const ipAddress = order.ip ?? '-';
  const checkoutDate = order.created_at ? new Date(order.created_at) : null;
  const estimatedShippingDate = order.estimate_delivery_date ? new Date(order.estimate_delivery_date) : null;

  return {
    orderSaleId: orderSaleId,
    sponsor,
    customerId,
    customerName,
    checkoutDate,
    ipAddress,
    estimatedShippingDate,
  };
};

export const getPartnerSettingFromPartnerSale = (orders: PartnerSalePure): PartnerSettingModel => {
  const country = orders.invoiceContactGroup?.country as Country;

  const estimatedShippingDate = orders.estimate_delivery_date
    ? new Date(orders.estimate_delivery_date)
    : null;

  const currency = orders.currency;

  const shippingCostValue = 0;

  const termOfPayment: PartnerSettingTermOfPayment = {
    earlyPaymentDiscount: String(orders.early_payment_discount_days ?? '-'),
    earlyPaymentDiscountPercent: String(orders.early_payment_discount_percentage ?? '-'),
    paymentDue: String(orders.paymentTerm?.due_days ?? '-'),
    valueDate: orders.pay_date ? new Date(orders.pay_date) : null,
  };

  const selects: PartnerSettingModelSelects = {
    partnerStatus: null,
    language: orders.language,
    paymentMethod: orders.paymentMethod,
    shippingProfile: orders.shippingProfile,
  };

  return { country, estimatedShippingDate, currency, shippingCostValue, termOfPayment, selects };
};

export const getPartnerCustomerFromPartnerSale = (orders: PartnerSalePure): PartnerCustomerModel | null => {
  if (!orders || !orders.user) return null;

  const { person, email, username, country, language, discount_ratio, ...userInfo } = orders.user;
  const rolesTitles = ['User'];

  return {
    email: email,
    username: username,
    gender: person?.gender,
    lastName: person?.last_name,
    firstName: person?.first_name,
    companyName: person?.company_name,
    taxNumber: userInfo.tax_number,
    vatNumber: userInfo.vat_number,
    eoriNumber: userInfo.eori_number,
    country: country?.name ?? orders.invoiceContactGroup?.country?.name ?? ' - ',
    language: language?.title ?? orders.language?.title ?? ' - ',
    paymentMethod: orders.paymentMethod?.name ?? ' - ',
    creditLimit: userInfo.credit_limit,
    shippingMethod: userInfo.shippingMethod?.name,
    paymentTerm: userInfo.paymentTerm,
    roles: rolesTitles,
    userDiscount: discount_ratio,
  };
};

export const getPartnerSalePositionsFromPartnerSale = (
  orders: PartnerSalePure,
): PartnerSalePositionModel[] => {
  const positionsWithProductVariation = orders.orderPartnerPositions;

  return positionsWithProductVariation;
};

//TODO: get name from translate
export const getPartnerDocuments = async (order_sale_id: number): Promise<PartnerDocumentsModel> => {
  const order = await getOnePartnerDocument(order_sale_id);

  return {
    documents: order.documents.map((order) => ({
      id: order.id,
      name: order.documentType?.name ?? ' - ',
      createDate: order.created_at ? new Date(order.created_at) : null,
      fileURL: order.link,
      number: order.number,
    })) as PartnerDocuments[],
    options: { invoiceId: order.invoice_id, orderSaleId: order_sale_id },
  };
};

export type PartnerGenerateType = 'default' | 'invoice';

export const generatePartnerSale = async (
  type: string,
  order_sale_id: number,
  values: PartnerReceiptsFormContext,
): Promise<string> => {
  if (type === 'invoice') return await generatePartnerInvoice(order_sale_id, values);
  if (type === 'invoice_cancellation') return await generatePartnerInvoiceCancellation(order_sale_id, values);
  else return 'Error';
};

export const getPartnerPaymentInfo = (order: PartnerSalePure): PartnerPaymentModel => {
  const { total_gross_amount, total_pending, total_payment } = order;

  return {
    total: total_gross_amount?.toFixed(2) ?? 0,
    pending: total_pending?.toFixed(2) ?? 0,
    paid: total_payment?.toFixed(2) ?? 0,
    payment_method: order.paymentMethod,
  };
};

export const generateCreditNoteForPartner = async (
  order_sale_id: number,
  { positions }: PartnerCreditGenerateModalFields,
): Promise<number> =>
  await generateCreditNote(order_sale_id, {
    positions: positions
      .filter((pos) => pos.isActive)
      .map((pos) => ({
        partner_position_id: pos.partnerPositionId,
        price_value: pos.priceValue,
        quantity: pos.quantity,
        vat_id: pos.vat.id,
      })),
  });

export const splitPartnerSaleWithSelection = async (
  order_sale_id: number,
  { positions }: PartnerSplitModalFields,
): Promise<number> =>
  await splitPartnerSale(order_sale_id, {
    positions: positions
      .filter((pos) => pos.isActive)
      .map((pos) => ({
        id: pos.partnerPositionId,
        quantity: pos.quantity,
      })),
  });

export const addPartnerDeliveryPacking = async (
  order_sale_id: number,
  { items, description, package: _package }: PartnerDeliveryModalFields,
): Promise<void> =>
  await addPartnerDelivery(order_sale_id, {
    description,
    package_id: _package?.id ?? -1,
    items: items
      .filter((item) => item.isActive)
      .map(({ quantity, product_variation_id }) => ({
        quantity,
        product_variation_id,
      })),
  });

export const updateStatus = async (
  orderSaleId: number,
  orderStatusId: number,
  moduleType: OrderModuleType,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
      return await updatePartnerStatus(orderSaleId, orderStatusId as unknown as string);
    case 'credit':
      return await updateCreditStatus(orderSaleId, orderStatusId);
    case 'subscription':
      return await updateSubscriptionStatus(orderSaleId, orderStatusId);
  }
};

export const updateFlag = async (
  { id, flag_ids }: { id: number; flag_ids: number[] },
  moduleType: OrderModuleType,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
      return await updatePartnerFlags(id, flag_ids);
    case 'credit':
      return await updateCreditFlags(id, flag_ids);
    case 'subscription':
      return await updateSubscriptionFlags(id, flag_ids);
  }
};

export const editPositions = async (
  { id, positions }: { id: number; positions },
  moduleType: OrderModuleType,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
      return await editPartnerSalePositions(id, positions);
    case 'credit':
      return await editCreditSalePositions(id, positions);
    case 'subscription':
      return await editSubscriptionSalePositions(id, positions);
  }
};
