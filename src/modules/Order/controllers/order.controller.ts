import { OrderDeliveryModalFields } from '@modules/Order';
import i18n from '@src/core/i18n/config';
import { Country } from '@src/modules/Country';
import { message } from 'antd';

import { editCreditSalePositions, updateCreditFlags, updateCreditStatus } from '../services/credit.service';
import {
  addOrderDelivery,
  editOrderSalePositions,
  generateCreditNote,
  generateCustomExport,
  generateDeliveryNote,
  generateInvoice,
  generateInvoiceCancellation,
  generatePaymentLink,
  generatePickList,
  generateTotalSummery,
  getOneOrderDocument,
  getOneOrderSale,
  splitOrderSale,
  updateANYColumn,
  updateOrderFlags,
  updateOrderSaleShippingCost,
  updateOrderStatus,
  updateShippingCost,
  updateShippingProfile,
} from '../services/order.service';
import { updatePartnerStatus } from '../services/partner.service';
import {
  editPurchaseSalePositions,
  updateANYColumnPurchase,
  updatePurchaseFlags,
  updatePurchaseShippingCost,
  updatePurchaseShippingProfile,
  updatePurchaseStatus,
} from '../services/purchase.service';
import {
  editSubscriptionSalePositions,
  updateANYColumnSub,
  updateSubscriptionFlags,
  updateSubscriptionShippingCost,
  updateSubscriptionShippingProfile,
  updateSubscriptionStatus,
} from '../services/subscription.service';
import {
  OrderCreditGenerateModalFields,
  OrderCustomerModel,
  OrderDocuments,
  OrderDocumentsModel,
  OrderInfoModel,
  OrderModuleType,
  OrderOverviewModel,
  OrderPaymentModel,
  OrderReceiptsFormContext,
  OrderSalePositionModel,
  OrderSalePositionPure,
  OrderSalePure,
  OrderSettingModel,
  OrderSettingModelSelects,
  OrderSettingTermOfPayment,
  OrderSplitModalFields,
} from '..';

export const getOrderSaleDetails = async (order_sale_id: number): Promise<OrderSalePure | null> =>
  await getOneOrderSale(order_sale_id);

export const getOrderOverviewFromOrderSale = (order: OrderSalePure): OrderOverviewModel => {
  const iso3 = order.currency?.iso3 ?? 'EUR';

  const itemQuantity = order?.total_quantity;

  const weight = order?.total_weight_gross ?? 0;

  return {
    amountPaid: order.total_payment ?? 0,
    grossValueOfItems: order.product_variations_gross_value ?? 0,
    iso3,
    itemQuantity,
    netValueOfItems: order.product_variations_net_value ?? 0,
    returnOnSale: order.return_on_sale,
    shippingCosts: order.gross_shipping_cost,
    totalPrice: order.total_gross_amount ?? 0,
    totalQv: order.total_qv ?? 0,
    totalProvisionPrice: order.total_provision_price ?? 0,
    totalProvisionPriceDiscount: order.total_provision_price_discount ?? 0,
    weight,
    wholeVat: order.total_vat_amount ?? 0,
  };
};

export const getOrderInfoFromOrderSale = (order: OrderSalePure): OrderInfoModel => {
  const orderSaleId = order.id ?? -1;

  const customerId = order.user?.id ?? -1;
  const customerName = order.user ? order.user.person?.first_name + ' ' + order.user.person?.last_name : '-';

  const sponsor = order.user.sponsor ? { id: order.user.sponsor.user_id, name: '' } : undefined;

  const ipAddress = order.ip ?? '-';
  const checkoutDate = order.order_date ? new Date(order.order_date) : null;
  const estimatedShippingDate = order.estimate_delivery_date ? new Date(order.estimate_delivery_date) : null;

  return {
    sponsor,
    orderSaleId,
    customerId,
    customerName,
    checkoutDate,
    ipAddress,
    estimatedShippingDate,
    ppd: order.price_percentage_discount,
  };
};

export const getOrderSettingFromOrderSale = (orders: OrderSalePure): OrderSettingModel => {
  const country = orders.country as Country;

  const estimatedShippingDate = orders.estimate_delivery_date
    ? new Date(orders.estimate_delivery_date)
    : null;

  const shippedOn = orders.shipped_on ? new Date(orders.shipped_on) : null;

  const currency = orders.currency;

  const shippingCostValue =
    orders.orderSalePositions?.find((order) => order.orderPositionType?.id === 6)?.price_value ?? 0;

  const termOfPayment: OrderSettingTermOfPayment = {
    earlyPaymentDiscount: String(orders.paymentTerm?.discount_days ?? '-'),
    earlyPaymentDiscountPercent: String(orders.paymentTerm?.discount_percentage ?? '-'),
    paymentDue: String(orders.paymentTerm?.due_days ?? '-'),
    valueDate: orders.paymentTerm?.value_date ? new Date(orders.paymentTerm?.value_date) : null,
  };

  const selects: OrderSettingModelSelects = {
    orderStatus: orders.orderStatus,
    language: orders.language,
    paymentMethod: orders.paymentMethod,
    shippingProfile: orders.shippingProfile,
  };

  return { country, shippedOn, estimatedShippingDate, currency, shippingCostValue, termOfPayment, selects };
};

export const getOrderCustomerFromOrderSale = (orders: OrderSalePure): OrderCustomerModel | null => {
  if (!orders || !orders.user) return null;

  const { person, roles, ...userInfo } = orders.user;
  const rolesTitles = roles?.map((role) => role.title);

  return {
    email: userInfo.email,
    username: userInfo.username,
    gender: person?.gender,
    lastName: person?.last_name,
    firstName: person?.first_name,
    companyName: person?.company_name,
    taxNumber: userInfo.tax_number,
    vatNumber: userInfo.vat_number,
    eoriNumber: userInfo.eori_number,
    country: userInfo.country?.name,
    language: userInfo.language?.title,
    paymentMethod: orders.paymentMethod?.name ?? ' - ',
    creditLimit: userInfo.credit_limit,
    shippingMethod: userInfo.shippingMethod?.name,
    paymentTerm: userInfo.paymentTerm,
    roles: rolesTitles,
    userDiscount: userInfo.discount_ratio,
  };
};

export const getOrderSalePositionsFromOrderSale = (orders: OrderSalePure): OrderSalePositionModel[] => {
  const positionsWithProductVariation = orders.orderSalePositions?.filter(
    (order) =>
      order.order_position_type_id == 1 ||
      order.order_position_type_id == 2 ||
      order.order_position_type_id == 3 ||
      order.order_position_type_id == 16 ||
      order.order_position_type_id == 18,
  );

  return positionsWithProductVariation?.map(
    ({
      discount,
      id,
      data_current,
      parent_id,
      productVariation,
      estimate_delivery_date,
      quantity,
      return_on_sale,
      updated_at,
      created_at,
      single_gross_amount,
      gross_amount,
      net_amount,
      price_value,
      orderPositionType,
      storageVariation,
      orderPositionMlmDetail: mlm,
      vat,
      weight_gross,
    }) => ({
      createdAt: created_at,
      discount,
      grossPrice: gross_amount,
      singleGrossPrice: single_gross_amount,
      singleNetPrice: price_value,
      netPrice: net_amount,
      orderId: id,
      vat,
      storageVariation,
      careerStepDiscount: mlm?.career_step_discount,
      percentageOfProvision: mlm?.percentage_of_provision,
      provisionPrice: mlm?.provision_price,
      parentId: parent_id,
      estimatedDeliveryDate: estimate_delivery_date ? new Date(estimate_delivery_date) : null,
      iso3: orders.currency?.iso3 ?? 'EUR',
      productId: productVariation.product?.id,
      productVariation: {
        id: productVariation.id,
        name: data_current?.name ?? productVariation.name,
        number: productVariation.number ?? String(productVariation.id ?? -1),
        availableUntil: productVariation.available_until ? new Date(productVariation.available_until) : null,
        deliveryDate: estimate_delivery_date ? new Date(estimate_delivery_date) : null,
        shippingName: orders.shippingProfile?.name ?? ' - ',
      },
      quantity,
      returnOnSale: return_on_sale,
      updatedAt: updated_at ? new Date(updated_at) : null,
      weight: Number(weight_gross ?? 0),
      orderPositionType,
    }),
  );
};

export const getOrderSalePositionsFromOrderPositions = (
  positions: OrderSalePositionPure[],
  iso3: string,
): OrderSalePositionModel[] => {
  const positionsWithProductVariation = positions.filter((order) => order.productVariation);

  return positionsWithProductVariation?.map(
    ({
      discount,
      id,
      parent_id,
      productVariation,
      estimate_delivery_date,
      single_gross_amount,
      quantity,
      return_on_sale,
      updated_at,
      storageVariation,
      created_at,
      gross_amount,
      net_amount,
      price_value,
      orderPositionType,
      orderPositionMlmDetail: mlm,
      vat,
      weight_gross,
    }) => ({
      createdAt: created_at,
      discount,
      grossPrice: gross_amount,
      netPrice: net_amount,
      singleGrossPrice: single_gross_amount,
      singleNetPrice: price_value,
      orderId: id,
      storageVariation,
      vat,
      careerStepDiscount: mlm?.career_step_discount,
      percentageOfProvision: mlm?.percentage_of_provision,
      provisionPrice: mlm?.provision_price,
      parentId: parent_id,
      estimatedDeliveryDate: estimate_delivery_date ? new Date(estimate_delivery_date) : null,
      iso3: iso3 ?? 'EUR',
      productId: productVariation.product?.id,
      productVariation: {
        id: productVariation.id,
        name: productVariation.name,
        number: productVariation.number ?? String(productVariation.id ?? -1),
        availableUntil: productVariation.available_until ? new Date(productVariation.available_until) : null,
        deliveryDate: estimate_delivery_date ? new Date(estimate_delivery_date) : null,
        shippingName: ' - ',
      },
      quantity,
      returnOnSale: return_on_sale,
      updatedAt: updated_at ? new Date(updated_at) : null,
      weight: Number(weight_gross ?? 0),
      orderPositionType,
    }),
  );
};

//TODO: get name from translate
export const getOrderDocuments = async (order_sale_id: number): Promise<OrderDocumentsModel> => {
  const order = await getOneOrderDocument(order_sale_id);

  return {
    documents: order.documents.map((order) => ({
      id: order.id,
      name: order.documentType?.name ?? ' - ',
      createDate: order.created_at ? new Date(order.created_at) : null,
      fileURL: order.link,
      number: order.number,
    })) as OrderDocuments[],
    options: { invoiceId: order.invoice_id, orderSaleId: order_sale_id },
  };
};

export type GenerateType =
  | 'default'
  | 'invoice'
  | 'invoice_cancellation'
  | 'delivery_note'
  | 'pick_list'
  | 'export_custom'
  | 'total_summery';

export const generate = async (
  type: GenerateType,
  order_sale_id: number,
  values: OrderReceiptsFormContext,
): Promise<string> => {
  if (type === 'invoice') return await generateInvoice(order_sale_id, values);
  else if (type === 'invoice_cancellation') return await generateInvoiceCancellation(order_sale_id, values);
  else if (type === 'delivery_note') return await generateDeliveryNote(order_sale_id, values);
  else if (type === 'pick_list') return await generatePickList(order_sale_id);
  else if (type === 'export_custom') return await generateCustomExport(order_sale_id);
  else if (type === 'total_summery') return await generateTotalSummery(order_sale_id);
  else return 'Error';
};

export const getOrderPaymentInfo = (order: OrderSalePure): OrderPaymentModel => {
  const { total_gross_amount, total_pending, total_payment } = order;

  return {
    total: total_gross_amount?.toFixed(2) ?? 0,
    pending: total_pending?.toFixed(2) ?? 0,
    paid: total_payment?.toFixed(2) ?? 0,
    payment_method: order.paymentMethod,
  };
};

export const generateCreditNoteForOrder = async (
  order_sale_id: number,
  { positions }: OrderCreditGenerateModalFields,
): Promise<number> =>
  await generateCreditNote(order_sale_id, {
    positions: positions
      .filter((pos) => pos.isActive)
      .map((pos) => ({
        order_position_id: pos.orderPositionId,
        price_value: pos.priceValue,
        quantity: pos.quantity,
        vat_id: pos.vat.id,
      })),
  });

export const splitOrderSaleWithSelection = async (
  order_sale_id: number,
  { positions }: OrderSplitModalFields,
): Promise<number> =>
  await splitOrderSale(order_sale_id, {
    positions: positions
      .filter((pos) => pos.isActive)
      .map((pos) => ({
        id: pos.orderPositionId,
        quantity: pos.quantity,
      })),
  });

export const addOrderDeliveryPacking = async (
  order_sale_id: number,
  { items, description, package: _package, number }: OrderDeliveryModalFields,
): Promise<any> =>
  await addOrderDelivery(order_sale_id, {
    description,
    number,
    package_id: _package?.id ?? -1,
    items: items
      .filter((item) => item.isActive)
      .map(({ quantity, product_variation_id, order_position_id }) => ({
        quantity,
        product_variation_id,
        order_position_id,
      })),
  });

export const updateStatus = async (
  orderSaleId: number,
  orderStatusId: number,
  moduleType: OrderModuleType,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
      return await updateOrderStatus(orderSaleId, orderStatusId);
    case 'credit':
      return await updateCreditStatus(orderSaleId, orderStatusId);
    case 'subscription':
      return await updateSubscriptionStatus(orderSaleId, orderStatusId);
    case 'purchase':
      return await updatePurchaseStatus(orderSaleId, orderStatusId);
    case 'partner':
      return await updatePartnerStatus(orderSaleId, orderStatusId as unknown as string);
  }
};

export const updateShippingProfiles = async (
  orderSaleId: number,
  shippingProfileId: number,
  moduleType: OrderModuleType,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
      return await updateShippingProfile(orderSaleId, shippingProfileId);
    case 'credit':
      return await updateShippingProfile(orderSaleId, shippingProfileId);
    case 'subscription':
      return await updateSubscriptionShippingProfile(orderSaleId, shippingProfileId);
    case 'purchase':
      return await updatePurchaseShippingProfile(orderSaleId, shippingProfileId);
  }
};

export const updateShippingCosts = async (
  orderSaleId: number,
  shippingCost: number,
  moduleType: OrderModuleType,
  vatAmount?: number,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
      return await updateOrderSaleShippingCost(orderSaleId, shippingCost);
    case 'credit':
      return await updateShippingCost(orderSaleId, shippingCost);
    case 'subscription':
      return await updateSubscriptionShippingCost(orderSaleId, shippingCost);
    case 'purchase':
      return await updatePurchaseShippingCost(orderSaleId, shippingCost, vatAmount ?? 0);
  }
};

export const updateFlag = async (
  { id, flag_ids }: { id: number; flag_ids: number[] },
  moduleType: OrderModuleType,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
      return await updateOrderFlags(id, flag_ids);
    case 'credit':
      return await updateCreditFlags(id, flag_ids);
    case 'subscription':
      return await updateSubscriptionFlags(id, flag_ids);
    case 'purchase':
      return await updatePurchaseFlags(id, flag_ids);
  }
};

export const editPositions = async (
  { id, positions }: { id: number; positions },
  moduleType: OrderModuleType,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
      return await editOrderSalePositions(id, positions);
    case 'credit':
      return await editCreditSalePositions(id, positions);
    case 'subscription':
      return await editSubscriptionSalePositions(id, positions);
    case 'purchase':
      return await editPurchaseSalePositions(id, positions);
  }
};

export const editAnyColumn = async (
  orderId: number,
  isEditable: boolean,
  body: Record<string, any>,
  moduleType: OrderModuleType,
): Promise<void> => {
  if (isEditable) {
    switch (moduleType) {
      case 'order-sale':
      case 'credit':
        return await updateANYColumn(orderId, moduleType, body);
      case 'subscription':
        return await updateANYColumnSub(orderId, body);
      case 'purchase':
        return await updateANYColumnPurchase(orderId, body);
    }
  } else {
    message.error(i18n.t('Order.Overview.EditError'));
  }
};

export const getPaymentLink = async (orderId: number): Promise<string> => {
  return await generatePaymentLink(orderId);
};
