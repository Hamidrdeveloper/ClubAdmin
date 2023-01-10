import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { PartnerDeliveryModalContext, PartnerPacking, PartnerSalePure } from '../model/partner.entity';
import {
  EditPartnerOrder,
  PartnerCreditGenerateModalContext,
  PartnerHistoryPure,
  PartnerPaymentPure,
  PartnerReceiptsFormContext,
  PartnerReceiptsModel,
  PartnerReceiptsPure,
  PartnerSplitModalContext,
} from '..';

const API = new ApiBuilder<PartnerSalePure>('/order-partners');

export const getOnePartnerSale = async (id: number): Promise<PartnerSalePure | null> => {
  try {
    return await API.getOne(id);
  } catch (e) {
    throw new Error(e);
  }
};

export const getOnePartnerDocument = async (id: number): Promise<PartnerReceiptsModel> => {
  try {
    const order = await API.request<PartnerSalePure>({
      url: `${Env.BASE_URL}/order-partners/${id}/order-documents`,
      method: 'GET',
    });
    return {
      documents: (order?.orderDocuments ?? []) as PartnerReceiptsPure[],
      invoice_id: order?.invoice_id ?? null,
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const generatePartnerInvoice = async (
  id: number,
  values: PartnerReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ partner_invoice_link: string }>({
    url: `${Env.BASE_URL}/order-partners/${id}/invoice-document`,
    body: values,
    method: 'POST',
  });

  return link?.partner_invoice_link ?? '';
};

export const generatePartnerInvoiceCancellation = async (
  id: number,
  values: PartnerReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ partner_invoice_cancellation_link: string }>({
    url: `${Env.BASE_URL}/order-partners/${id}/invoice-document-cancellation`,
    body: values,
    method: 'POST',
  });

  return link?.partner_invoice_cancellation_link ?? '';
};

export const generateDeliveryNote = async (
  id: number,
  values: PartnerReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ delivery_note_link: string }>({
    url: `${Env.BASE_URL}/delivery-note/${id}/invoice`,
    body: values,
    method: 'POST',
  });

  return link?.delivery_note_link ?? '';
};

export const addPartnerSalePosition = async (id: number, positions: EditPartnerOrder): Promise<void> => {
  const result = await API.request<void>({
    url: `order-partners/${id}/positions`,
    body: positions,
    method: 'POST',
  });
  message.success(
    i18n.t('Global.CreatedSuccessfully', { title: i18n.t('Order.Partner.Position.Title_other') }),
  );

  return result;
};

export const editPartnerSalePositions = async (id: number, positions: EditPartnerOrder[]): Promise<void> => {
  const result = await API.request<void>({
    url: `order-partners/${id}/positions`,
    body: { order_partner_positions: positions },
    method: 'PUT',
  });
  message.success(
    i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Partner.Position.Title_other') }),
  );

  return result;
};

export const removePartnerSalePosition = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-partner-positions/${id}`,
    method: 'DELETE',
  });

  message.success(i18n.t('Global.RemovedSuccessfully', { title: i18n.t('Order.Partner.Position.Title') }));
};

export const disconnectPartnerSalePosition = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order-sale-positions/${id}/disconnect-bundle`,
    method: 'DELETE',
  });

  message.success(i18n.t('Global.RemovedSuccessfully', { title: i18n.t('Order.Partner.Position.Title') }));
};

export const copyPartnerSale = async (id: number): Promise<number> => {
  const result = await API.request<PartnerSalePure>({
    url: `order/partners/${id}/copy`,
    method: 'PUT',
  });
  message.success(i18n.t('Global.CopiedSuccessfully', { title: i18n.t('Order.Partner.Title') }));

  return result.id;
};

export const splitPartnerSale = async (id: number, body: PartnerSplitModalContext): Promise<number> => {
  const result = await API.request<{ id: number }>({
    url: `order/partners/${id}/split`,
    body,
    method: 'POST',
  });
  message.success(i18n.t('Global.SplitSuccessfully', { title: i18n.t('Order.Partner.Title') }));

  return result?.id;
};

export const updatePartnerStatus = async (id: number, status: string): Promise<void> => {
  await API.request<void>({
    url: `order-partners/${id}/update-column`,
    body: { status },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Partner.Title') }));
};

export const updatePartnerPaymentStatus = async (id: number, payment_status: string): Promise<void> => {
  await API.request<void>({
    url: `order-partners/${id}/update-payment-status`,
    body: { payment_status },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Partner.Title') }));
};

export const updatePartnerShippingProfile = async (
  id: number,
  shipping_profile_id: number,
): Promise<void> => {
  await API.request<void>({
    url: `order/partners/${id}/shipping-profile`,
    body: { shipping_profile_id },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Partner.Title') }));
};

export const updatePartnerShippingCost = async (
  id: number,
  price_value: number,
  vat_amount: number,
): Promise<void> => {
  await API.request<void>({
    url: `order/partners/${id}/shipping`,
    body: { price_value, vat_value: vat_amount },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Partner.Title') }));
};

export const updatePartnerFlags = async (id: number, flag_ids: number[]): Promise<void> => {
  await API.request<void>({
    url: `order/partners/${id}/flags`,
    body: { flag_ids },
    method: 'PUT',
  });
};

export const getAllPartnerPayments = async (id: number): Promise<PartnerPaymentPure[]> => {
  return await API.request<PartnerPaymentPure[]>({
    url: `order/partners/${id}/payments?status=success`,
    method: 'GET',
  });
};

export const getAllPartnerHistories = async (id: number): Promise<PartnerHistoryPure[]> => {
  return await API.request<PartnerHistoryPure[]>({
    url: `orders/histories?orderBy={"id":"DESC"}&orderId=${id}&orderType=orderPartner`,
    method: 'GET',
  });
};

export const getAllPartnerPackings = async (id: number): Promise<PartnerPacking[]> => {
  return await API.request<PartnerPacking[]>({
    url: `order/partners/${id}/packing`,
    method: 'GET',
  });
};

export const addPartnerDelivery = async (id: number, body: PartnerDeliveryModalContext): Promise<void> => {
  await API.request<void>({
    url: `order/partners/${id}/packing`,
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

export const partnerCheckoutDate = async (id: number): Promise<void> => {
  await API.request<void>({ url: `order/partners/${id}/checkout-date`, method: 'PUT' });
  //
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Partner.Title') }));
};

export const partnerDeliveryQuantity = async (position_id: number, quantity: number): Promise<void> => {
  await API.request<void>({
    url: `order/partners/positions/${position_id}/delivered-quantity`,
    method: 'PUT',
    body: { delivered_quantity: quantity },
  });
  //
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Partner.Title') }));
};

export const updateANYColumnPartner = async (
  order_sale_id: number,
  body: Record<string, any>,
): Promise<void> => {
  await API.request<void>({
    url: `order/partners/${order_sale_id}/update-column`,
    body,
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Order.Title') }));
};

// TODO: Output should be credit note
export const generateCreditNote = async (
  orderId: number,
  body: PartnerCreditGenerateModalContext,
): Promise<number> => {
  const result = await API.request<{ id: number }>({
    url: `order/sales/${orderId}/credit-note`,
    body,
    method: 'POST',
  });
  return result?.id;
};
