import { Country } from '@src/modules/Country';

import {
  generateCorrectionDocument,
  generateCorrectionDocumentCancellation,
  generateCreditNote,
  generateCreditNoteInvoice,
  generateCreditNoteInvoiceCancellation,
  getOneCreditDocument,
  getOneCreditSale,
  splitCreditSale,
} from '../services/credit.service';
import {
  CreditCustomerModel,
  CreditDocuments,
  CreditDocumentsModel,
  CreditInfoModel,
  CreditOverviewModel,
  CreditPaymentModel,
  CreditReceiptsFormContext,
  CreditSalePositionModel,
  CreditSalePure,
  CreditSettingModel,
  CreditSettingModelSelects,
  CreditSettingTermOfPayment,
  OrderCreditGenerateModalFields,
  OrderSplitModalFields,
} from '..';

export const getCreditSaleDetails = async (order_sale_id: number): Promise<CreditSalePure | null> =>
  await getOneCreditSale(order_sale_id);

export const getCreditOverviewFromCreditSale = ({
  orderCreditNotePositions,
  total_payment,
  total_net_amount,
  total_vat_amount,
  total_gross_amount,
  order,
  ...credit
}: CreditSalePure): CreditOverviewModel => {
  const iso3 = order.currency?.iso3 ?? 'EUR';
  const itemQuantity = orderCreditNotePositions
    .map((order) => (order.orderPosition.productVariation ? order.quantity : 0))
    .reduce((a, b) => a + b, 0);

  const weight = order?.total_weight_gross ?? 0;

  return {
    amountPaid: total_payment ?? 0,
    grossValueOfItems: total_gross_amount ?? 0,
    iso3,
    itemQuantity,
    netValueOfItems: total_net_amount ?? 0,
    returnOnSale: order.return_on_sale ?? 0,
    shippingCosts: order.gross_shipping_cost,
    totalQv: credit.total_qv ?? 0,
    totalProvisionPrice: credit.total_provision_price ?? 0,
    totalProvisionPriceDiscount: credit.total_provision_price_discount ?? 0,
    totalPrice: total_gross_amount ?? 0,
    weight,
    wholeVat: total_vat_amount ?? 0,
  };
};

export const getCreditInfoFromCreditSale = ({
  order_date,
  order,
  price_percentage_discount,
}: CreditSalePure): CreditInfoModel => {
  const orderSaleId = order.id ?? -1;

  const customerId = order.user ? order.user.id : 0;
  const customerName = order.user ? order.user.person?.first_name + ' ' + order.user.person?.last_name : '-';

  const sponsor = order.user.sponsor ? { id: order.user.sponsor.user_id, name: '' } : undefined;

  const ipAddress = order.ip ?? '-';
  const checkoutDate = order_date ? new Date(order_date) : null;
  const estimatedShippingDate = order.estimate_delivery_date ? new Date(order.estimate_delivery_date) : null;
  const shippedOn = order.shipped_on ? new Date(order.shipped_on) : null;

  return {
    sponsor,
    shippedOn,
    orderSaleId,
    customerId,
    customerName,
    checkoutDate,
    ipAddress,
    estimatedShippingDate,
    ppd: price_percentage_discount,
  };
};

export const getCreditSettingFromCreditSale = ({
  orderCreditNotePositions,
  pay_date,
  orderStatus,
  language,
  paymentMethod,
  order,
}: CreditSalePure): CreditSettingModel | null => {
  if (!order) return null;
  const country = order.country as Country;

  const estimatedShippingDate = order.estimate_delivery_date ? new Date(order.estimate_delivery_date) : null;
  const shippedOn = order.shipped_on ? new Date(order.shipped_on) : null;

  const currency = order.currency;

  const shippingCostValue =
    orderCreditNotePositions?.find((order) => order.orderPosition.orderPositionType?.id === 6)?.price_value ??
    0;

  const termOfPayment: CreditSettingTermOfPayment = {
    earlyPaymentDiscount: String(order.early_payment_discount_days ?? '-'),
    earlyPaymentDiscountPercent: String(order.early_payment_discount_percentage ?? '-'),
    paymentDue: String(order.paymentTerm?.due_days ?? '-'),
    valueDate: pay_date ? new Date(pay_date) : null,
  };

  const selects: CreditSettingModelSelects = {
    orderStatus: orderStatus,
    language: language,
    paymentMethod: paymentMethod,
    shippingProfile: order.shippingProfile,
  };

  return { country, estimatedShippingDate, currency, shippingCostValue, termOfPayment, selects, shippedOn };
};

export const getCreditCustomerFromCreditSale = ({
  paymentMethod,
  order,
}: CreditSalePure): CreditCustomerModel | null => {
  if (!order) return null;

  const { person, roles, ...userInfo } = order.user;
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
    paymentMethod: paymentMethod?.name,
    creditLimit: userInfo.credit_limit,
    shippingMethod: userInfo.shippingMethod?.name,
    paymentTerm: userInfo.paymentTerm,
    roles: rolesTitles,
    userDiscount: userInfo.discount_ratio,
  };
};

export const getCreditSalePositionsFromCreditSale = ({
  orderCreditNotePositions,
  order,
}: CreditSalePure): CreditSalePositionModel[] => {
  const positionsWithProductVariation = orderCreditNotePositions?.filter(
    (order) => order.orderPosition.productVariation,
  );

  const result: CreditSalePositionModel[] = positionsWithProductVariation?.map(
    ({
      id,
      orderPosition: {
        discount,
        productVariation,
        estimate_delivery_date,
        return_on_sale,
        updated_at,
        created_at,
        vat: { number, valid_from },
      },
      orderPositionMlmDetail: mlm,
      quantity,
      vat_id,
      single_gross_amount,
      price_value,
      vat_value,
      vat_amount,
      gross_amount,
      net_amount,
      weight_gross,
    }) => ({
      createdAt: created_at,
      discount,
      grossPrice: gross_amount,
      netPrice: net_amount,
      singleGrossPrice: single_gross_amount,
      singleNetPrice: price_value,
      orderId: id,
      vat: { id: vat_id, value: vat_value, amount: vat_amount, number, valid_from },
      careerStepDiscount: mlm?.career_step_discount,
      percentageOfProvision: mlm?.percentage_of_provision,
      provisionPrice: mlm?.provision_price,
      iso3: order.currency?.iso3 ?? 'EUR',
      productId: productVariation.product?.id,
      productVariation: {
        id: productVariation.id,
        name: productVariation.name,
        number: productVariation.number ?? String(productVariation.id ?? -1),
        availableUntil: productVariation.available_until ? new Date(productVariation.available_until) : null,
        deliveryDate: estimate_delivery_date ? new Date(estimate_delivery_date) : null,
        shippingName: order.shippingProfile?.name ?? ' - ',
      },
      quantity,
      returnOnSale: return_on_sale,
      updatedAt: updated_at ? new Date(updated_at) : null,
      weight: Number(weight_gross ?? 0),
    }),
  );

  return result;
};

//TODO: get name from translate
export const getCreditDocuments = async (order_sale_id: number): Promise<CreditDocumentsModel> => {
  const order = await getOneCreditDocument(order_sale_id);

  return {
    documents: order.documents.map((order, index) => ({
      id: index + 1,
      name: order.documentType?.name ?? ' - ',
      createDate: order.created_at ? new Date(order.created_at) : null,
      fileURL: order.link,
      number: order.number,
    })) as CreditDocuments[],
    options: {
      correctionUrl: order.correction_document_link,
      creditNoteUrl: order.credit_note_document_link,
      orderSaleId: order_sale_id,
    },
  };
};

export type CreditNoteGenerateType =
  | 'default'
  | 'credit_note'
  | 'credit_note_cancellation'
  | 'correction_document'
  | 'correction_document_cancellation';

export const generateInvoiceCredit = async (
  type: CreditNoteGenerateType,
  order_sale_id: number,
  values: CreditReceiptsFormContext,
): Promise<string> => {
  if (type === 'credit_note') return await generateCreditNoteInvoice(order_sale_id, values);
  else if (type === 'credit_note_cancellation')
    return await generateCreditNoteInvoiceCancellation(order_sale_id, values);
  else if (type === 'correction_document') return await generateCorrectionDocument(order_sale_id, values);
  else if (type === 'correction_document_cancellation')
    return await generateCorrectionDocumentCancellation(order_sale_id, values);
  else return 'Error';
};

export const getCreditPaymentInfo = ({
  total_payment,
  total_pending,
  total_gross_amount,
  paymentMethod,
}: CreditSalePure): CreditPaymentModel => {
  return {
    total: total_gross_amount?.toFixed(2) ?? 0,
    pending: total_pending?.toFixed(2) ?? 0,
    paid: total_payment?.toFixed(2) ?? 0,
    payment_method: paymentMethod,
  };
};

export const generateCreditNoteForCredit = async (
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

export const splitCreditSaleWithSelection = async (
  order_sale_id: number,
  { positions }: OrderSplitModalFields,
): Promise<number> =>
  await splitCreditSale(order_sale_id, {
    positions: positions
      .filter((pos) => pos.isActive)
      .map((pos) => ({
        id: pos.orderPositionId,
        quantity: pos.quantity,
      })),
  });
