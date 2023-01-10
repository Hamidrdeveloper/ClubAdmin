import {
  OrderCallShipperModel,
  OrderDeliveryModalContext,
  OrderModuleType,
  OrderPacking,
  OrderSaleGroupFunctionFormFields,
} from '@modules/Order';
import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import {
  EditOrder,
  OrderCreditGenerateModalContext,
  OrderHistoryPure,
  OrderPaymentPure,
  OrderReceiptsFormContext,
  OrderReceiptsModel,
  OrderReceiptsPure,
  OrderSalePure,
  OrderSplitModalContext,
} from '..';

const API = new ApiBuilder<OrderSalePure>('/order-sale');

export const getOneOrderSale = async (id: number): Promise<OrderSalePure | null> => {
  try {
    return await API.getOne(id);
  } catch (e) {
    throw new Error(e);
  }
};

export const getOneOrderDocument = async (id: number): Promise<OrderReceiptsModel> => {
  try {
    const order = await API.request<OrderSalePure>({
      url: `${Env.BASE_URL}/order-sales/${id}/order-documents`,
      method: 'GET',
    });
    return {
      documents: (order?.orderDocuments ?? []) as OrderReceiptsPure[],
      invoice_id: order?.invoice_id ?? null,
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const generateInvoice = async (id: number, values?: OrderReceiptsFormContext): Promise<string> => {
  const link = await API.request<{ invoice_link: string }>({
    url: `${Env.BASE_URL}/order-sales/${id}/invoice`,
    body: values,
    method: 'POST',
  });

  return link?.invoice_link ?? '';
};

export const generateInvoiceCancellation = async (
  id: number,
  values?: OrderReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ invoice_cancellation_link: string }>({
    url: `${Env.BASE_URL}/order-sales/${id}/invoice-cancellation`,
    body: values,
    method: 'POST',
  });

  return link?.invoice_cancellation_link ?? '';
};

export const generatePickList = async (id: number): Promise<string> => {
  const link = await API.request<{ pick_list_document_link: string }>({
    url: `order-sales/${id}/pick-list-document`,
    method: 'POST',
  });

  return link?.pick_list_document_link ?? '';
};

export const generateCustomExport = async (id: number): Promise<string> => {
  const link = await API.request<{ export_custom_document_link: string }>({
    url: `order-sales/${id}/export-custom-document`,
    method: 'POST',
  });
  return link?.export_custom_document_link ?? '';
};

export const generateTotalSummery = async (id: number): Promise<string> => {
  const link = await API.request<{ total_summery_document_link: string }>({
    url: `order-sales/${id}/total-summery-document`,
    method: 'POST',
  });
  return link?.total_summery_document_link ?? '';
};

export const generateDeliveryNote = async (id: number, values: OrderReceiptsFormContext): Promise<string> => {
  const link = await API.request<{ delivery_note_link: string }>({
    url: `${Env.BASE_URL}/delivery-note/${id}/invoice`,
    body: values,
    method: 'POST',
  });

  return link?.delivery_note_link ?? '';
};

export const generatePackListDocument = async (id: number): Promise<string> => {
  const result = await API.request<{ pack_list_document_link: string }>({
    url: `packing-journals/${id}/pack-list-document`,
    method: 'POST',
  });

  console.log('res', result);
  return result?.pack_list_document_link;
};

export const editOrderSalePositions = async (id: number, positions: EditOrder[]): Promise<void> => {
  const result = await API.request<void>({
    url: `order-sales/${id}/positions`,
    body: { order_sale_positions: positions },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Position.Title_other') }));

  return result;
};

export const addOrderSalePosition = async (
  id: number,
  data: {
    product_variation_id: number;
    quantity: number;
  },
): Promise<void> => {
  const result = await API.request<void>({
    url: `order-sales/${id}/product-variations`,
    body: data,
    method: 'POST',
  });
  message.success(i18n.t('Global.CreatedSuccessfully', { title: i18n.t('Order.Position.Title') }));

  return result;
};

export const removeOrderSalePosition = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-sale-positions/${id}`,
    method: 'DELETE',
  });

  message.success(i18n.t('Global.RemovedSuccessfully', { title: i18n.t('Order.Position.Title') }));
};

export const disconnectOrderSalePosition = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-sale-positions/${id}/disconnect-bundle`,
    method: 'DELETE',
  });

  message.success(i18n.t('Global.RemovedSuccessfully', { title: i18n.t('Order.Position.Title') }));
};

export const copyOrderSale = async (id: number): Promise<number> => {
  const result = await API.request<OrderSalePure>({
    url: `order-sales/${id}/copy`,
    method: 'PUT',
  });
  message.success(i18n.t('Global.CopiedSuccessfully', { title: i18n.t('Order.Title') }));

  return result.id;
};

export const splitOrderSale = async (id: number, body: OrderSplitModalContext): Promise<number> => {
  const result = await API.request<{ id: number }>({
    url: `order-sales/${id}/split`,
    body,
    method: 'POST',
  });
  message.success(i18n.t('Global.SplitSuccessfully', { title: i18n.t('Order.Title') }));

  return result?.id;
};

export const updateOrderStatus = async (id: number, order_status_id: number): Promise<void> => {
  await API.request<void>({
    url: `order-sales/${id}/update-status`,
    body: { order_status_id },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

export const updateShippingProfile = async (id: number, shipping_profile_id: number): Promise<void> => {
  await API.request<void>({
    url: `order-sales/${id}/shipping-profile`,
    body: { shipping_profile_id },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

export const updateShippingCost = async (id: number, price_value: number): Promise<void> => {
  await API.request<void>({
    url: `credit-notes/${id}/shipping`,
    body: { price_value },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

export const updateOrderSaleShippingCost = async (id: number, price_value: number): Promise<void> => {
  await API.request<void>({
    url: `order-sales/${id}/shipping`,
    body: { price_value },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

export const updateOrderFlags = async (id: number, flag_ids: number[]): Promise<void> => {
  await API.request<void>({
    url: `order-sales/${id}/flags`,
    body: { flag_ids },
    method: 'PUT',
  });
};

export const getAllPayments = async (id: number): Promise<OrderPaymentPure[]> => {
  return await API.request<OrderPaymentPure[]>({
    url: `order-sales/${id}/payments`,
    method: 'GET',
  });
};

export const getAllHistories = async (id: number): Promise<OrderHistoryPure[]> => {
  return await API.request<OrderHistoryPure[]>({
    url: `orders/histories?orderBy={"id":"DESC"}&orderId=${id}&orderType=orderSale`,
    method: 'GET',
  });
};

export const getAllPackings = async (id: number): Promise<OrderPacking[]> => {
  return await API.request<OrderPacking[]>({
    url: `order-sales/${id}/packing`,
    method: 'GET',
  });
};

export const addOrderDelivery = async (id: number, body: OrderDeliveryModalContext): Promise<any> => {
  return await API.request<any>({
    url: `order-sales/${id}/packing`,
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

export const callShipping = async (packing_id: number): Promise<OrderCallShipperModel> => {
  return await API.request<OrderCallShipperModel>({
    url: `packing-journals/${packing_id}/call-shipper`,
    method: 'POST',
  });
};

export const removePacking = async (packing_id: number): Promise<void> => {
  await API.request({
    url: `packing-journals/${packing_id}`,
    method: 'DELETE',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

export const updateTrackingNumber = async (packing_id: number, number: string | number): Promise<void> => {
  await API.request<void>({
    url: `packing-journals/${packing_id}/number`,
    body: { number },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

export const updateANYColumn = async (
  order_sale_id: number,
  moduleType: OrderModuleType,
  body: Record<string, any>,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
      await API.request<void>({
        url: `order-sales/${order_sale_id}/update-column`,
        body,
        method: 'PUT',
      });
      break;
    case 'credit':
      await API.request<void>({
        url: `credit-notes/${order_sale_id}/update-column`,
        body,
        method: 'PUT',
      });
      break;

    case 'subscription':
      await API.request<void>({
        url: `order-subscriptions/${order_sale_id}/update-column`,
        body,
        method: 'PUT',
      });
      break;
  }
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

export const incomeShippedItems = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-sales/${id}/modify-inventory`,
    method: 'PUT',
  });

  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

export const shippedOnPUT = async (id: number, shipped_on: string | null): Promise<void> => {
  await API.request<void>({
    url: `order/sales/${id}/shipped-on`,
    method: 'PUT',
    body: { shipped_on },
  });

  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

// TODO: Output should be credit note
export const generateCreditNote = async (
  orderId: number,
  body: OrderCreditGenerateModalContext,
): Promise<number> => {
  const result = await API.request<{ id: number }>({
    url: `order/sales/${orderId}/credit-note`,
    body,
    method: 'POST',
  });
  return result?.id;
};

export const generatePaymentLink = async (orderId: number): Promise<string> => {
  const result = await API.request<{ link: string }>({
    url: `order/sales/${orderId}/generate-payment-link`,
    method: 'GET',
  });

  return result?.link;
};

export const updateCareerStepDiscount = async (orderId: number, price_value: number): Promise<any> => {
  const result = await API.request<any>({
    url: `order-sales/${orderId}/career-step-bonus`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updateUserDiscount = async (orderId: number, price_value: number): Promise<any> => {
  const result = await API.request<any>({
    url: `order-sales/${orderId}/user-discount`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updateVoucherLevelDiscount = async (orderId: number, price_value: number): Promise<any> => {
  const result = await API.request<any>({
    url: `order-sales/${orderId}/voucher-level`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updateShippingCostDiscount = async (orderId: number, price_value: number): Promise<any> => {
  const result = await API.request<any>({
    url: `order-sales/${orderId}/shipping`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updatePromotionalCouponDiscount = async (orderId: number, price_value: number): Promise<any> => {
  const result = await API.request<any>({
    url: `order-sales/${orderId}/promotional-coupon`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updateOrderSaleCheckoutDate = async (
  orderId: number,
  order_date: string | moment.Moment | number | Date,
): Promise<{ message: string }> => {
  const result = await API.request<{ message: string }>({
    url: `order-sales/${orderId}/update-column`,
    body: { order_date },
    method: 'PUT',
  });

  return result;
};

export const updateBulkOrderSale = async (
  data: OrderSaleGroupFunctionFormFields,
): Promise<{ message: string }> => {
  const result = await API.request<any>({
    url: '/order-sales',
    method: 'PUT',
    body: data,
  });

  return result;
};
