import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { OrderDeliveryModalContext, OrderPacking } from '../model/order.entity';
import {
  EditSubscription,
  SubscriptionHistoryPure,
  SubscriptionPaymentPure,
  SubscriptionReceiptsFormContext,
  SubscriptionReceiptsModel,
  SubscriptionReceiptsPure,
  SubscriptionSalePure,
  SubscriptionSplitModalContext,
} from '..';

const API = new ApiBuilder<SubscriptionSalePure>('/order-subscriptions');

export const getOneSubscriptionSale = async (id: number): Promise<SubscriptionSalePure | null> => {
  try {
    return await API.getOne(id);
  } catch (e) {
    throw new Error(e);
  }
};

export const getOneSubscriptionDocument = async (id: number): Promise<SubscriptionReceiptsModel> => {
  try {
    const order = await API.request<SubscriptionSalePure>({
      url: `${Env.BASE_URL}/order-subscriptions/${id}/order-documents`,
      method: 'GET',
    });
    return {
      documents: (order?.orderDocuments ?? []) as SubscriptionReceiptsPure[],
      invoice_id: order?.invoice_id ?? null,
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const generateInvoice = async (
  id: number,
  values: SubscriptionReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ invoice_link: string }>({
    url: `${Env.BASE_URL}/order-subscriptions/${id}/invoice`,
    body: values,
    method: 'POST',
  });

  return link?.invoice_link ?? '';
};

export const generateInvoiceCancellation = async (
  id: number,
  values: SubscriptionReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ invoice_cancellation_link: string }>({
    url: `${Env.BASE_URL}/order-subscriptions/${id}/invoice-cancellation`,
    body: values,
    method: 'POST',
  });

  return link?.invoice_cancellation_link ?? '';
};

export const generateDeliveryNote = async (
  id: number,
  values: SubscriptionReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ delivery_note_link: string }>({
    url: `${Env.BASE_URL}/delivery-note/${id}/invoice`,
    body: values,
    method: 'POST',
  });

  return link?.delivery_note_link ?? '';
};

export const editSubscriptionSalePositions = async (
  id: number,
  positions: EditSubscription[],
): Promise<void> => {
  const result = await API.request<void>({
    url: `order-subscriptions/${id}/positions`,
    body: { order_subscription_positions: positions },
    method: 'PUT',
  });
  message.success(
    i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Subscription.Position.Title_other') }),
  );

  return result;
};

export const addSubscriptionSalePosition = async (
  id: number,
  data: {
    product_variation_id: number;
    quantity: number;
  },
): Promise<void> => {
  const result = await API.request<void>({
    url: `order-subscriptions/${id}/product-variations`,
    body: data,
    method: 'POST',
  });
  message.success(i18n.t('Global.CreatedSuccessfully', { title: i18n.t('Subscription.Position.Title') }));

  return result;
};

export const removeSubscriptionSalePosition = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-subscription-positions/${id}`,
    method: 'DELETE',
  });

  message.success(i18n.t('Global.RemovedSuccessfully', { title: i18n.t('Subscription.Position.Title') }));
};

export const disconnectSubscriptionSalePosition = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-subscription-positions/${id}/disconnect-bundle`,
    method: 'DELETE',
  });

  message.success(i18n.t('Global.RemovedSuccessfully', { title: i18n.t('Subscription.Position.Title') }));
};

export const copySubscriptionSale = async (id: number): Promise<number> => {
  const result = await API.request<SubscriptionSalePure>({
    url: `order-subscriptions/${id}/copy`,
    method: 'PUT',
  });
  message.success(i18n.t('Global.CopiedSuccessfully', { title: i18n.t('Order.Subscription.Title') }));

  return result.id;
};

export const splitSubscriptionSale = async (
  id: number,
  body: SubscriptionSplitModalContext,
): Promise<number> => {
  const result = await API.request<{ id: number }>({
    url: `order-subscriptions/${id}/split`,
    body,
    method: 'POST',
  });
  message.success(i18n.t('Global.SplitSuccessfully', { title: i18n.t('Order.Subscription.Title') }));

  return result?.id;
};

export const updateSubscriptionStatus = async (id: number, order_status_id: number): Promise<void> => {
  await API.request<void>({
    url: `order-subscriptions/${id}/update-status`,
    body: { order_status_id },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Subscription.Title') }));
};

export const updateSubscriptionShippingProfile = async (
  id: number,
  shipping_profile_id: number,
): Promise<void> => {
  await API.request<void>({
    url: `order-subscriptions/${id}/shipping-profile`,
    body: { shipping_profile_id },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Subscription.Title') }));
};

export const updateSubscriptionShippingCost = async (id: number, price_value: number): Promise<void> => {
  await API.request<void>({
    url: `order-subscriptions/${id}/shipping`,
    body: { price_value },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Subscription.Title') }));
};

export const updateSubscriptionSubDays = async (id: number, days: number): Promise<void> => {
  await API.request<void>({
    url: `order-subscriptions/${id}/time-period`,
    body: { time_period: days },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Subscription.Title') }));
};

export const unsubscribeOrderSale = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-subscriptions/${id}/unSubscribe`,
    method: 'PUT',
  });

  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Subscription.Title') }));
};

export const generateOrderSaleFromOrderSub = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-subscriptions/${id}/order-sale`,
    method: 'POST',
  });

  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Subscription.Title') }));
};

export const updateSubscriptionFlags = async (id: number, flag_ids: number[]): Promise<void> => {
  await API.request<void>({
    url: `order-subscriptions/${id}/flags`,
    body: { flag_ids },
    method: 'PUT',
  });
};

export const getAllPayments = async (id: number): Promise<SubscriptionPaymentPure[]> => {
  return await API.request<SubscriptionPaymentPure[]>({
    url: `order-subscriptions/${id}/payments`,
    method: 'GET',
  });
};

export const getAllHistoriesForSubscription = async (id: number): Promise<SubscriptionHistoryPure[]> => {
  return await API.request<SubscriptionHistoryPure[]>({
    url: `orders/histories?orderBy={"id":"DESC"}&orderId=${id}&orderType=orderSubscription`,
    method: 'GET',
  });
};

export const getAllPackings = async (id: number): Promise<OrderPacking[]> => {
  return await API.request<OrderPacking[]>({
    url: `order-subscriptions/${id}/packing`,
    method: 'GET',
  });
};

export const addSubscriptionDelivery = async (id: number, body: OrderDeliveryModalContext): Promise<void> => {
  await API.request<void>({
    url: `order-subscriptions/${id}/packing`,
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

export const generateConfirmationCancellationDocument = async (
  id: number,
  values: SubscriptionReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ subscriptions_confirmation_cancellation_document_link: string }>({
    url: `order-subscriptions/${id}/confirmation-document-cancellation`,
    body: values,
    method: 'POST',
  });

  return link?.subscriptions_confirmation_cancellation_document_link ?? '';
};

export const generateConfirmationDocument = async (
  id: number,
  values: SubscriptionReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ subscriptions_confirmation_document_link: string }>({
    url: `order-subscriptions/${id}/confirmation-document`,
    body: values,
    method: 'POST',
  });

  return link?.subscriptions_confirmation_document_link ?? '';
};

export const updateANYColumnSub = async (order_sale_id: number, body: Record<string, any>): Promise<void> => {
  await API.request<void>({
    url: `order-subscriptions/${order_sale_id}/update-column`,
    body,
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};
