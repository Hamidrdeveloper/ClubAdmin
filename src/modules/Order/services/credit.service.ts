import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import {
  CreditPaymentPure,
  CreditReceiptsFormContext,
  CreditReceiptsModel,
  CreditReceiptsPure,
  CreditSalePure,
  EditCredit,
  OrderCreditGenerateModalContext,
  OrderSplitModalContext,
} from '..';

const API = new ApiBuilder<CreditSalePure>('/order-credit-notes');

export const getOneCreditSale = async (id: number): Promise<CreditSalePure | null> => {
  try {
    return await API.getOne(id);
  } catch (e) {
    throw new Error(e);
  }
};

export const getOneCreditDocument = async (id: number): Promise<CreditReceiptsModel> => {
  try {
    const { correction_document_link, credit_note_document_link, orderDocuments } =
      await API.request<CreditSalePure>({
        url: `credit-notes/${id}/order-documents`,
        method: 'GET',
      });
    return {
      documents: (orderDocuments ?? []) as CreditReceiptsPure[],
      correction_document_link,
      credit_note_document_link,
    };
  } catch (e) {
    throw new Error(e);
  }
};

export const generateCreditNoteInvoice = async (
  id: number,
  values: CreditReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ credit_note_document_link: string }>({
    url: `credit-notes/${id}/credit-note`,
    body: values,
    method: 'POST',
  });

  return link?.credit_note_document_link ?? '';
};

export const generateCreditNoteInvoiceCancellation = async (
  id: number,
  values: CreditReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ credit_note_cancellation_document_link: string }>({
    url: `credit-notes/${id}/credit-note-cancellation`,
    body: values,
    method: 'POST',
  });

  return link?.credit_note_cancellation_document_link ?? '';
};

export const generateCorrectionDocument = async (
  id: number,
  values: CreditReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ correction_document_link: string }>({
    url: `credit-notes/${id}/correction-document`,
    body: values,
    method: 'POST',
  });

  return link?.correction_document_link ?? '';
};

export const generateCorrectionDocumentCancellation = async (
  id: number,
  values: CreditReceiptsFormContext,
): Promise<string> => {
  const link = await API.request<{ correction_cancellation_document_link: string }>({
    url: `credit-notes/${id}/correction-document-cancellation`,
    body: values,
    method: 'POST',
  });

  return link?.correction_cancellation_document_link ?? '';
};

export const editCreditSalePositions = async (id: number, positions: EditCredit[]): Promise<void> => {
  const result = await API.request<void>({
    url: `order/credit-notes/${id}/positions`,
    body: { positions },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Credit.Position.Title_other') }));

  return result;
};

export const addCreditSalePosition = async (
  id: number,
  data: {
    product_variation_id: number;
    quantity: number;
  },
): Promise<void> => {
  const result = await API.request<void>({
    url: `order-credit-notes/${id}/product-variations`,
    body: data,
    method: 'POST',
  });
  message.success(i18n.t('Global.CreatedSuccessfully', { title: i18n.t('Credit.Position.Title') }));

  return result;
};

export const removeCreditSalePosition = async (id: number): Promise<void> => {
  await API.request<void>({
    url: `order/credit-notes/positions/${id}`,
    method: 'DELETE',
  });

  message.success(i18n.t('Global.RemovedSuccessfully', { title: i18n.t('Credit.Position.Title') }));
};

export const copyCreditSale = async (id: number): Promise<number> => {
  const result = await API.request<CreditSalePure>({
    url: `order-credit-notes/${id}/copy`,
    method: 'PUT',
  });
  message.success(i18n.t('Global.CopiedSuccessfully', { title: i18n.t('Credit.Title') }));

  return result.id;
};

export const splitCreditSale = async (id: number, body: OrderSplitModalContext): Promise<number> => {
  return (
    await API.request<{ id: number }>({
      url: `order-credit-notes/${id}/split`,
      body,
      method: 'POST',
    })
  )?.id;
};

export const updateCreditStatus = async (id: number, order_status_id: number): Promise<void> => {
  await API.request<void>({
    url: `credit-notes/${id}/update-status`,
    body: { order_status_id },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Credit.Title') }));
};

export const updateShippingProfile = async (id: number, shipping_profile_id: number): Promise<void> => {
  await API.request<void>({
    url: `order-credit-notes/${id}/shipping-profile`,
    body: { shipping_profile_id },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Credit.Title') }));
};

export const updateShippingCost = async (id: number, price_value: number): Promise<void> => {
  await API.request<void>({
    url: `order-credit-notes/${id}/shipping`,
    body: { price_value },
    method: 'PUT',
  });
  message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Credit.Title') }));
};

export const updateCreditFlags = async (id: number, flag_ids: number[]): Promise<void> => {
  await API.request<void>({
    url: `credit-notes/${id}/flags`,
    body: { flag_ids },
    method: 'PUT',
  });
};

export const getAllCreditPayments = async (id: number): Promise<CreditPaymentPure[]> => {
  return await API.request<CreditPaymentPure[]>({
    url: `order/credit-notes/${id}/payments`,
    method: 'GET',
  });
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

export const updateCheckoutDate = async (
  orderId: number,
  order_date: string | moment.Moment | number | Date,
): Promise<{ message: string }> => {
  const result = await API.request<{ message: string }>({
    url: `credit-notes/${orderId}/update-column`,
    body: { order_date },
    method: 'PUT',
  });

  return result;
};

export const updateOrderCreditNotesShippingCost = async (
  orderId: number,
  price_value: number,
): Promise<any> => {
  const result = await API.request<any>({
    url: `credit-notes/${orderId}/shipping`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updateOrderCreditNotesVoucherLevel = async (
  orderId: number,
  price_value: number,
): Promise<any> => {
  const result = await API.request<any>({
    url: `credit-notes/${orderId}/voucher-level`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updateOrderCreditNotesCareerSteps = async (
  orderId: number,
  price_value: number,
): Promise<any> => {
  const result = await API.request<any>({
    url: `credit-notes/${orderId}/career-step-bonus`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updateOrderCreditNotesCouponItem = async (
  orderId: number,
  price_value: number,
): Promise<any> => {
  const result = await API.request<any>({
    url: `credit-notes/${orderId}/coupon-item`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updateOrderCreditNotesPromotionalCoupon = async (
  orderId: number,
  price_value: number,
): Promise<any> => {
  const result = await API.request<any>({
    url: `credit-notes/${orderId}/promotional-coupon`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updateOrderCreditNotesPromotionalArticle = async (
  orderId: number,
  price_value: number,
): Promise<any> => {
  const result = await API.request<any>({
    url: `credit-notes/${orderId}/promotional-article`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};

export const updateOrderCreditNotesWalletPoint = async (
  orderId: number,
  price_value: number,
): Promise<any> => {
  const result = await API.request<any>({
    url: `credit-notes/${orderId}/wallet-point`,
    method: 'PUT',
    body: { price_value },
  });

  return result;
};
