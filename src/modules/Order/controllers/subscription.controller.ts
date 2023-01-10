import { SubscriptionDeliveryModalFields } from '@modules/Order';
import { Country } from '@src/modules/Country';

import {
  addSubscriptionDelivery,
  generateConfirmationCancellationDocument,
  generateConfirmationDocument,
  getOneSubscriptionDocument,
  getOneSubscriptionSale,
  splitSubscriptionSale,
} from '../services/subscription.service';
import {
  OrderInfoModel,
  SubscriptionCustomerModel,
  SubscriptionDocuments,
  SubscriptionDocumentsModel,
  SubscriptionOverviewModel,
  SubscriptionPaymentModel,
  SubscriptionReceiptsFormContext,
  SubscriptionSalePositionModel,
  SubscriptionSalePure,
  SubscriptionSettingModel,
  SubscriptionSettingModelSelects,
  SubscriptionSettingTermOfPayment,
  SubscriptionSplitModalFields,
} from '..';

export const getSubscriptionSaleDetails = async (
  order_sale_id: number,
): Promise<SubscriptionSalePure | null> => await getOneSubscriptionSale(order_sale_id);

export const getSubscriptionOverviewFromSubscriptionSale = (
  order: SubscriptionSalePure,
): SubscriptionOverviewModel => {
  const iso3 = order.currency?.iso3 ?? 'EUR';

  const itemQuantity = order.positions
    .map((order) => (order.productVariation ? order.quantity : 0))
    .reduce((a, b) => a + b, 0);

  const weight = order.positions
    .map((order) => Number(order.productVariation?.weight ?? 0) * Number(order.quantity ?? 0))
    .reduce((a, b) => a + b, 0);

  return {
    amountPaid: order.total_payment ?? 0,
    grossValueOfItems: order.total_gross_amount ?? 0,
    iso3,
    itemQuantity,
    netValueOfItems: order.total_net_amount ?? 0,
    returnOnSale: order.return_on_sale ?? 0,
    shippingCosts: order.gross_shipping_cost,
    totalPrice: order.total_price ?? 0,
    totalQv: order.total_qv ?? 0,
    totalProvisionPrice: order.total_provision_price ?? 0,
    totalProvisionPriceDiscount: order.total_provision_price_discount ?? 0,
    weight,
    wholeVat: order.total_vat_amount ?? 0,
    subscriptionDate: new Date(order.created_at),
  };
};

export const getSubscriptionInfoFromSubscriptionSale = (order: SubscriptionSalePure): OrderInfoModel => {
  const orderSaleId = order.id ?? -1;

  const customerId = order.user ? order.user.id : 0;
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
    lastOrderSaleDate: order.last_order_sale_date ? new Date(order.last_order_sale_date) : undefined,
    nextOrderSaleDate: order.next_order_sale_date ? new Date(order.next_order_sale_date) : undefined,
  };
};

export const getSubscriptionSettingFromSubscriptionSale = (
  orders: SubscriptionSalePure,
): SubscriptionSettingModel => {
  const country = orders.invoiceContactGroup?.country as Country;

  const estimatedShippingDate = orders.estimate_delivery_date
    ? new Date(orders.estimate_delivery_date)
    : null;

  const shippedOn = orders.shipped_on ? new Date(orders.shipped_on) : null;

  const currency = orders.currency;

  const shippingCostValue =
    orders.positions?.find((order) => order.orderPositionType?.id === 6)?.price_value ?? 0;

  const termOfPayment: SubscriptionSettingTermOfPayment = {
    earlyPaymentDiscount: String(orders.early_payment_discount_days ?? '-'),
    earlyPaymentDiscountPercent: String(orders?.paymentTerm?.discount_percentage ?? '-'),
    paymentDue: String(orders.paymentTerm?.due_days ?? '-'),
    valueDate: orders.pay_date ? new Date(orders.pay_date) : null,
  };

  const selects: SubscriptionSettingModelSelects = {
    orderStatus: orders.orderStatus,
    language: orders.language,
    paymentMethod: orders.paymentMethod,
    shippingProfile: orders.shippingProfile,
  };

  return {
    country,
    shippedOn,
    estimatedShippingDate,
    currency,
    shippingCostValue,
    termOfPayment,
    selects,
    timePeriod: orders.time_period,
  };
};

export const getSubscriptionCustomerFromSubscriptionSale = (
  orders: SubscriptionSalePure,
): SubscriptionCustomerModel | null => {
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

export const getSubscriptionSalePositionsFromSubscriptionSale = (
  orders: SubscriptionSalePure,
): SubscriptionSalePositionModel[] => {
  const positionsWithProductVariation = orders.positions?.filter((order) => order.productVariation);

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
      gross_amount,
      storageVariation,
      net_amount,
      price_value,
      single_gross_amount,
      orderPositionType,
      orderPositionMlmDetail: mlm,
      vat,
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
      weight: Number(productVariation.weight ?? 0) * quantity,
      orderPositionType,
    }),
  );
};

//TODO: get name from translate
export const getSubscriptionDocuments = async (
  order_sale_id: number,
): Promise<SubscriptionDocumentsModel> => {
  const order = await getOneSubscriptionDocument(order_sale_id);

  return {
    documents: order.documents.map((order) => ({
      id: order.id,
      name: order.documentType?.name ?? ' - ',
      createDate: order.created_at ? new Date(order.created_at) : null,
      fileURL: order.link,
      number: order.number,
    })) as SubscriptionDocuments[],
    options: { invoiceId: order.invoice_id, orderSaleId: order_sale_id },
  };
};

export type SubscriptionGenerateType = 'default' | 'cancellation' | 'confirmation';

export const generateSubscribeDocuments = async (
  type: SubscriptionGenerateType,
  order_sale_id: number,
  values: SubscriptionReceiptsFormContext,
): Promise<string> => {
  if (type === 'cancellation') return await generateConfirmationCancellationDocument(order_sale_id, values);
  else if (type === 'confirmation') return await generateConfirmationDocument(order_sale_id, values);
  else return 'Error';
};

export const getSubscriptionPaymentInfo = (order: SubscriptionSalePure): SubscriptionPaymentModel => {
  const { total_price, remaining_price, total_payment } = order;

  return {
    total: total_price.toFixed(2),
    pending: remaining_price.toFixed(2),
    paid: total_payment.toFixed(2),
    payment_method: order.paymentMethod,
  };
};

export const splitSubscriptionSaleWithSelection = async (
  order_sale_id: number,
  { positions }: SubscriptionSplitModalFields,
): Promise<number> =>
  await splitSubscriptionSale(order_sale_id, {
    positions: positions
      .filter((pos) => pos.isActive)
      .map((pos) => ({
        id: pos.orderPositionId,
        quantity: pos.quantity,
      })),
  });

export const addSubscriptionDeliveryPacking = async (
  order_sale_id: number,
  { items, description, package: _package, number }: SubscriptionDeliveryModalFields,
): Promise<void> =>
  await addSubscriptionDelivery(order_sale_id, {
    description,
    number,
    package_id: _package?.id ?? -1,
    items: items
      .filter((item) => item.isActive)
      .map(({ quantity, product_variation_id }) => ({
        quantity,
        product_variation_id,
      })),
  });
