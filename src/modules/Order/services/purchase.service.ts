import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import {
  PurchaseDeliveryModalContext,
  PurchasePacking,
  PurchaseSalePure,
  PurchaseUploadDocumentContext,
} from '../model/purchase.entity';
import {
  EditPurchase,
  PurchaseCreditGenerateModalContext,
  PurchaseHistoryPure,
  PurchasePaymentPure,
  PurchaseReceiptsFormContext,
  PurchaseReceiptsModel,
  PurchaseReceiptsPure,
  PurchaseSplitModalContext,
} from '..';

const API = new ApiBuilder<PurchaseSalePure>('/order/purchases');

export const getOnePurchaseSale = async (id: number): Promise<PurchaseSalePure | null> => {
  try {
    return await API.getOne(id);
  } catch (e) {
    throw new Error(e);
  }
};

export const getOnePurchaseDocument = async (id: number): Promise<PurchaseReceiptsModel> => {
  try {
    const order = await API.request<PurchaseSalePure>({
      url: `${Env.BASE_URL}/order/purchases/${id}/documents`,
      method: 'GET',
    });
    return {
      documents: (order?.orderDocuments ?? []) as PurchaseReceiptsPure[],
      invoice_id: order?.invoice_id ?? null,
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const generatePurchase = async (id: number, values: PurchaseReceiptsFormContext): Promise<string> => {
  const link = await API.request<{ purchase_note_document_link: string }>({
    url: `${Env.BASE_URL}/order/purchases/${id}/documents/purchase`,
    body: values,
    method: 'POST',
  });

  return link?.purchase_note_document_link ?? '';
};

export const generateInvoiceCancellation = async (
  id: number,
  values: PurchaseReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ invoice_cancellation_link: string }>({
    url: `${Env.BASE_URL}/order/purchases/${id}/invoice-cancellation`,
    body: values,
    method: 'POST',
  });

  return link?.invoice_cancellation_link ?? '';
};

export const generateDeliveryNote = async (
  id: number,
  values: PurchaseReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ delivery_note_link: string }>({
    url: `${Env.BASE_URL}/delivery-note/${id}/invoice`,
    body: values,
    method: 'POST',
  });

  return link?.delivery_note_link ?? '';
};

export const editPurchaseSalePositions = async (id: number, positions: EditPurchase[]): Promise<void> => {
  const result = await API.request<void>({
    url: `order/purchases/${id}/positions/product-variations`,
    body: { order_purchase_positions: positions },
    method: 'PUT',
  });
  message.success(
    i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Purchase.Position.Title_other') }),
  );

  return result;
};

export const uploadPurchaseDocument = async (
  id: number,
  document: PurchaseUploadDocumentContext,
): Promise<void> => {
  const result = await API.request<void>({
    url: `order/purchases/${id}/documents`,
    body: document,
    method: 'POST',
  });

  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Purchase.Title') }));

  return result;
};

export const addPurchaseSalePosition = async (
  id: number,
  data: {
    product_variation_id: number;
    quantity: number;
  },
): Promise<void> => {
  const result = await API.request<void>({
    url: `order/purchases/${id}/positions/product-variations`,
    body: data,
    method: 'POST',
  });
  message.success(i18n.t('Global.CreatedSuccessfully', { title: i18n.t('Order.Purchase.Position.Title') }));

  return result;
};

export const removePurchaseSalePosition = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-sale-positions/${id}`,
    method: 'DELETE',
  });

  message.success(i18n.t('Global.RemovedSuccessfully', { title: i18n.t('Order.Purchase.Position.Title') }));
};

export const disconnectPurchaseSalePosition = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-sale-positions/${id}/disconnect-bundle`,
    method: 'DELETE',
  });

  message.success(i18n.t('Global.RemovedSuccessfully', { title: i18n.t('Order.Purchase.Position.Title') }));
};

export const copyPurchaseSale = async (id: number): Promise<number> => {
  const result = await API.request<PurchaseSalePure>({
    url: `order/purchases/${id}/copy`,
    method: 'PUT',
  });
  message.success(i18n.t('Global.CopiedSuccessfully', { title: i18n.t('Order.Purchase.Title') }));

  return result.id;
};

export const splitPurchaseSale = async (id: number, body: PurchaseSplitModalContext): Promise<number> => {
  const result = await API.request<{ id: number }>({
    url: `order/purchases/${id}/split`,
    body,
    method: 'POST',
  });
  message.success(i18n.t('Global.SplitSuccessfully', { title: i18n.t('Order.Purchase.Title') }));

  return result?.id;
};

export const updatePurchaseStatus = async (id: number, order_status_id: number): Promise<void> => {
  await API.request<void>({
    url: `order/purchases/${id}/status`,
    body: { order_status_id },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Purchase.Title') }));
};

export const updatePurchaseShippingProfile = async (
  id: number,
  shipping_profile_id: number,
): Promise<void> => {
  await API.request<void>({
    url: `order/purchases/${id}/shipping-profile`,
    body: { shipping_profile_id },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Purchase.Title') }));
};

export const updatePurchaseShippingCost = async (
  id: number,
  price_value: number,
  vat_amount: number,
): Promise<void> => {
  await API.request<void>({
    url: `order/purchases/${id}/shipping`,
    body: { price_value, vat_value: vat_amount },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Purchase.Title') }));
};

export const updatePurchaseFlags = async (id: number, flag_ids: number[]): Promise<void> => {
  await API.request<void>({
    url: `order/purchases/${id}/flags`,
    body: { flag_ids },
    method: 'PUT',
  });
};

export const getAllPurchasePayments = async (id: number): Promise<PurchasePaymentPure[]> => {
  return await API.request<PurchasePaymentPure[]>({
    url: `order/purchases/${id}/payments?status=success`,
    method: 'GET',
  });
};

export const getAllPurchaseHistories = async (id: number): Promise<PurchaseHistoryPure[]> => {
  return await API.request<PurchaseHistoryPure[]>({
    url: `orders/histories?orderBy={"id":"DESC"}&orderId=${id}&orderType=orderPurchase`,
    method: 'GET',
  });
};

export const getAllPurchasePackings = async (id: number): Promise<PurchasePacking[]> => {
  return await API.request<PurchasePacking[]>({
    url: `order/purchases/${id}/packing`,
    method: 'GET',
  });
};

export const addPurchaseDelivery = async (id: number, body: PurchaseDeliveryModalContext): Promise<void> => {
  await API.request<void>({
    url: `order/purchases/${id}/packing`,
    body,
    method: 'POST',
  });
};

export const trackingLink = async (id: number): Promise<string> =>
  (
    await API.request<{ link: string }>({
      url: `packing-journals/${id}/tracker/link`,
      method: 'GET',
    })
  ).link;

export const purchaseCheckoutDate = async (id: number): Promise<void> => {
  await API.request<void>({ url: `order/purchases/${id}/checkout-date`, method: 'PUT' });
  //
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Purchase.Title') }));
};

export const purchaseDeliveryQuantity = async (position_id: number, quantity: number): Promise<void> => {
  await API.request<void>({
    url: `order/purchases/positions/${position_id}/delivered-quantity`,
    method: 'PUT',
    body: { delivered_quantity: quantity },
  });
  //
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Purchase.Title') }));
};

export const updateANYColumnPurchase = async (
  order_sale_id: number,
  body: Record<string, any>,
): Promise<void> => {
  await API.request<void>({
    url: `order/purchases/${order_sale_id}/update-column`,
    body,
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

// TODO: Output should be credit note
export const generateCreditNote = async (
  orderId: number,
  body: PurchaseCreditGenerateModalContext,
): Promise<number> => {
  const result = await API.request<{ id: number }>({
    url: `order/sales/${orderId}/credit-note`,
    body,
    method: 'POST',
  });
  return result?.id;
};
