import i18n from '@src/core/i18n/config';
import { PaginationRequest, ResponseMeta } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';

import { OrderEmailsModalFields, OrderEmailsSentHistory } from '..';

const API = new ApiBuilder<OrderEmailsModalFields>('/email');

export const getMailPreview = async (body: {
  order_id: number;
  template_id: number;
}): Promise<OrderEmailsModalFields> => {
  try {
    return await API.request<OrderEmailsModalFields>({
      url: 'email/template/preview',
      method: 'POST',
      body,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const getSubscriptionMailPreview = async (
  order_id: number,
  body: {
    template_id: number;
  },
): Promise<OrderEmailsModalFields> => {
  try {
    return await API.request<OrderEmailsModalFields>({
      url: `order/subscriptions/${order_id}/email/preview`,
      method: 'POST',
      body,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const getPurchaseMailPreview = async (
  order_id: number,
  body: {
    template_id: number;
  },
): Promise<OrderEmailsModalFields> => {
  try {
    return await API.request<OrderEmailsModalFields>({
      url: `order/purchases/${order_id}/email/preview`,
      method: 'POST',
      body,
    });
  } catch (e) {
    throw new Error(e);
  }
};

const SentMails_API = new ApiBuilder<OrderEmailsSentHistory>('/email/log/data');
export const getAllSentMails = async (
  params: {
    mailableId: number;
    mailableType: string;
  },
  options: { pagination: PaginationRequest },
): Promise<[OrderEmailsSentHistory[], ResponseMeta]> => {
  try {
    const result = await await SentMails_API.getAll({
      params,
      orderBy: { id: 'DESC' },
      pagination: options.pagination,
    });

    return [result.data, result.meta];
  } catch (e) {
    throw new Error(e);
  }
};

export const sendMailPreview = async (body: OrderEmailsModalFields, orderId: number): Promise<void> => {
  try {
    await API.request({
      url: 'email/preview/send/' + orderId,
      method: 'POST',
      body,
    });

    message.success(i18n.t('Global.MailSendedSuccessfully', { title: i18n.t('Order.Title') }));
  } catch (e) {
    throw new Error(e);
  }
};

export const sendSubscriptionMailPreview = async (
  body: OrderEmailsModalFields,
  orderId: number,
): Promise<void> => {
  try {
    await API.request({
      url: `order/subscriptions/${orderId}/email/preview/send`,
      method: 'POST',
      body,
    });

    message.success(i18n.t('Global.MailSendedSuccessfully', { title: i18n.t('Order.Title') }));
  } catch (e) {
    throw new Error(e);
  }
};

export const sendPurchaseMailPreview = async (
  body: OrderEmailsModalFields,
  orderId: number,
): Promise<void> => {
  try {
    await API.request({
      url: `order/purchases/${orderId}/email/preview/send`,
      method: 'POST',
      body,
    });

    message.success(i18n.t('Global.MailSendedSuccessfully', { title: i18n.t('Order.Title') }));
  } catch (e) {
    throw new Error(e);
  }
};

export const resendMailPreview = async (logId: number): Promise<void> => {
  try {
    await API.request({
      url: 'email/log/mail/' + logId,
      method: 'POST',
    });

    message.success(i18n.t('Global.MailSendedSuccessfully', { title: i18n.t('Order.Title') }));
  } catch (e) {
    throw new Error(e);
  }
};

export const sendMailPreviewWithoutCaution = async (body: {
  order_id: number;
  language: string;
  template_id: number;
}): Promise<void> => {
  try {
    await API.request({
      url: 'order/email/send',
      method: 'POST',
      body,
    });

    message.success(i18n.t('Global.MailSendedSuccessfully', { title: i18n.t('Order.Title') }));
  } catch (e) {
    throw new Error(e);
  }
};

export const sendSubscriptionMailPreviewWithoutCaution = async (
  order_id: number,
  body: {
    template_id: number;
  },
): Promise<void> => {
  try {
    await API.request({
      url: `order/subscriptions/${order_id}/email/send`,
      method: 'POST',
      body,
    });

    message.success(i18n.t('Global.MailSendedSuccessfully', { title: i18n.t('Order.Title') }));
  } catch (e) {
    throw new Error(e);
  }
};

export const sendPurchaseMailPreviewWithoutCaution = async (
  order_id: number,
  body: {
    template_id: number;
  },
): Promise<void> => {
  try {
    await API.request({
      url: `order/purchases/${order_id}/email/send`,
      method: 'POST',
      body,
    });

    message.success(i18n.t('Global.MailSendedSuccessfully', { title: i18n.t('Order.Title') }));
  } catch (e) {
    throw new Error(e);
  }
};
