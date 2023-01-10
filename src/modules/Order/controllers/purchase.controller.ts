import { PurchaseDeliveryModalFields } from '@modules/Order';
import { Country } from '@src/modules/Country';

import { editCreditSalePositions, updateCreditFlags, updateCreditStatus } from '../services/credit.service';
import {
  addPurchaseDelivery,
  editPurchaseSalePositions,
  generateCreditNote,
  generatePurchase,
  getOnePurchaseDocument,
  getOnePurchaseSale,
  splitPurchaseSale,
  updatePurchaseFlags,
  updatePurchaseStatus,
} from '../services/purchase.service';
import {
  editSubscriptionSalePositions,
  updateSubscriptionFlags,
  updateSubscriptionStatus,
} from '../services/subscription.service';
import {
  OrderModuleType,
  PurchaseCreditGenerateModalFields,
  PurchaseCustomerModel,
  PurchaseDocuments,
  PurchaseDocumentsModel,
  PurchaseInfoModel,
  PurchaseOverviewModel,
  PurchasePaymentModel,
  PurchaseReceiptsFormContext,
  PurchaseSalePositionModel,
  PurchaseSalePure,
  PurchaseSettingModel,
  PurchaseSettingModelSelects,
  PurchaseSettingTermOfPayment,
  PurchaseSplitModalFields,
} from '..';

export const getPurchaseSaleDetails = async (order_sale_id: number): Promise<PurchaseSalePure | null> =>
  await getOnePurchaseSale(order_sale_id);

export const getPurchaseOverviewFromPurchaseSale = (order: PurchaseSalePure): PurchaseOverviewModel => {
  const iso3 = order.currency?.iso3 ?? 'EUR';

  const itemQuantity = order.orderPurchasePositions
    .map((order) => (order.productVariation ? order.quantity : 0))
    .reduce((a, b) => a + b, 0);

  const weight = order?.total_weight_gross ?? 0;

  return {
    amountPaid: order.total_payment ?? 0,
    grossValueOfItems: order.product_variations_gross_amount ?? 0,
    iso3,
    itemQuantity,
    netValueOfItems: order.total_net_amount ?? 0,
    returnOnSale: order.return_on_sale ?? 0,
    shippingCosts: order.gross_shipping_amount ?? 0,
    totalPrice: order.total_gross_amount ?? 0,
    weight,
    wholeVat: order.total_vat_amount ?? 0,
  };
};

export const getPurchaseInfoFromPurchaseSale = (order: PurchaseSalePure): PurchaseInfoModel => {
  const orderSaleId = order.id ?? -1;

  const customerId = order.supplier ? order.supplier.id : 0;
  const customerName = order.supplier
    ? order.supplier.people?.first_name + ' ' + order.supplier.people?.last_name
    : '-';

  const ipAddress = order.ip ?? '-';
  const checkoutDate = order.order_date ? new Date(order.order_date) : null;
  const estimatedShippingDate = order.estimate_delivery_date ? new Date(order.estimate_delivery_date) : null;

  return { orderSaleId, customerName, customerId, checkoutDate, ipAddress, estimatedShippingDate };
};

export const getPurchaseSettingFromPurchaseSale = (orders: PurchaseSalePure): PurchaseSettingModel => {
  const country = orders.invoiceContactGroup?.country as Country;

  const estimatedShippingDate = orders.estimate_delivery_date
    ? new Date(orders.estimate_delivery_date)
    : null;

  const shippedOn = orders.shipped_on ? new Date(orders.shipped_on) : null;

  const currency = orders.currency;

  const shippingCostValue =
    orders.orderPurchasePositions?.find((order) => order.orderPositionType?.id === 6)?.price_value ?? 0;

  const termOfPayment: PurchaseSettingTermOfPayment = {
    earlyPaymentDiscount: String(orders.early_payment_discount_days ?? '-'),
    earlyPaymentDiscountPercent: String(orders.early_payment_discount_percentage ?? '-'),
    paymentDue: String(orders.paymentTerm?.due_days ?? '-'),
    valueDate: orders.pay_date ? new Date(orders.pay_date) : null,
  };

  const selects: PurchaseSettingModelSelects = {
    orderStatus: orders.orderStatus,
    language: orders.language,
    paymentMethod: orders.paymentMethod,
    shippingProfile: orders.shippingProfile,
  };

  return { country, estimatedShippingDate, currency, shippingCostValue, termOfPayment, selects, shippedOn };
};

export const getPurchaseCustomerFromPurchaseSale = (
  orders: PurchaseSalePure,
): PurchaseCustomerModel | null => {
  if (!orders || !orders.supplier) return null;

  const { people, ...userInfo } = orders.supplier;
  const rolesTitles = ['Supplier'];

  return {
    email: people?.user?.email,
    username: people?.user?.username,
    gender: people?.gender,
    lastName: people?.last_name,
    firstName: people?.first_name,
    companyName: people?.company_name,
    taxNumber: userInfo.tax_number,
    vatNumber: userInfo.vat_number,
    eoriNumber: userInfo.eori_number,
    country: people?.user?.country?.name ?? orders.invoiceContactGroup?.country?.name ?? ' - ',
    language: people?.user?.language?.title ?? orders.language?.title ?? ' - ',
    paymentMethod: orders.paymentMethod?.name,
    creditLimit: userInfo.credit_limit,
    shippingMethod: userInfo.shippingMethod?.name,
    paymentTerm: userInfo.paymentTerm,
    roles: rolesTitles,
    userDiscount: people?.user?.discount_ratio,
  };
};

export const getPurchaseSalePositionsFromPurchaseSale = (
  orders: PurchaseSalePure,
): PurchaseSalePositionModel[] => {
  const positionsWithProductVariation = orders.orderPurchasePositions?.filter(
    (order) => order.productVariation,
  );

  return positionsWithProductVariation?.map(
    ({
      discount,
      id,
      parent_id,
      data_current,
      productVariation,
      estimate_delivery_date,
      delivered_quantity,
      quantity,
      return_on_sale,
      updated_at,
      created_at,
      price_value,
      storageVariation,
      single_gross_amount,
      gross_amount,
      net_amount,
      orderPositionType,
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
      deliveredQuantity: delivered_quantity,
      returnOnSale: return_on_sale,
      updatedAt: updated_at ? new Date(updated_at) : null,
      weight: Number(weight_gross ?? 0),
      orderPositionType,
    }),
  );
};

//TODO: get name from translate
export const getPurchaseDocuments = async (order_sale_id: number): Promise<PurchaseDocumentsModel> => {
  const order = await getOnePurchaseDocument(order_sale_id);

  return {
    documents: order.documents.map((order) => ({
      id: order.id,
      name: order.documentType?.name ?? ' - ',
      createDate: order.created_at ? new Date(order.created_at) : null,
      fileURL: order.link,
      number: order.number,
    })) as PurchaseDocuments[],
    options: { invoiceId: order.invoice_id, orderSaleId: order_sale_id },
  };
};

export type PurchaseGenerateType = 'default' | 'generatePurchase';

export const generatePurchaseSale = async (
  type: PurchaseGenerateType,
  order_sale_id: number,
  values: PurchaseReceiptsFormContext,
): Promise<string> => {
  if (type === 'generatePurchase') return await generatePurchase(order_sale_id, values);
  else return 'Error';
};

export const getPurchasePaymentInfo = (order: PurchaseSalePure): PurchasePaymentModel => {
  const { total_gross_amount, total_pending, total_payment } = order;

  return {
    total: total_gross_amount?.toFixed(2) ?? 0,
    pending: total_pending?.toFixed(2) ?? 0,
    paid: total_payment?.toFixed(2) ?? 0,
    payment_method: order.paymentMethod,
  };
};

export const generateCreditNoteForPurchase = async (
  order_sale_id: number,
  { positions }: PurchaseCreditGenerateModalFields,
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

export const splitPurchaseSaleWithSelection = async (
  order_sale_id: number,
  { positions }: PurchaseSplitModalFields,
): Promise<number> =>
  await splitPurchaseSale(order_sale_id, {
    positions: positions
      .filter((pos) => pos.isActive)
      .map((pos) => ({
        id: pos.orderPositionId,
        quantity: pos.quantity,
      })),
  });

export const addPurchaseDeliveryPacking = async (
  order_sale_id: number,
  { items, description, package: _package }: PurchaseDeliveryModalFields,
): Promise<void> =>
  await addPurchaseDelivery(order_sale_id, {
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
      return await updatePurchaseStatus(orderSaleId, orderStatusId);
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
      return await updatePurchaseFlags(id, flag_ids);
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
      return await editPurchaseSalePositions(id, positions);
    case 'credit':
      return await editCreditSalePositions(id, positions);
    case 'subscription':
      return await editSubscriptionSalePositions(id, positions);
  }
};
