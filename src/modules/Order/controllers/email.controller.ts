import {
  getMailPreview,
  getPurchaseMailPreview,
  getSubscriptionMailPreview,
  resendMailPreview,
  sendMailPreview,
  sendMailPreviewWithoutCaution,
  sendPurchaseMailPreview,
  sendPurchaseMailPreviewWithoutCaution,
  sendSubscriptionMailPreview,
  sendSubscriptionMailPreviewWithoutCaution,
} from '../services/email.service';
import { OrderEmailsModalFields, OrderModuleType } from '..';

export const getEmailPreviewForEmailTab = async (
  order_id: number,
  body: {
    template_id: number;
  },
  moduleType: OrderModuleType,
): Promise<OrderEmailsModalFields> => {
  switch (moduleType) {
    case 'order-sale':
    case 'partner':
    case 'credit':
      return await getMailPreview({ ...body, order_id });
    case 'subscription':
      return await getSubscriptionMailPreview(order_id, body);
    case 'purchase':
      return await getPurchaseMailPreview(order_id, body);
    default:
      return await getMailPreview({ ...body, order_id });
  }
};

export const sendEmailPreview = async (
  body: OrderEmailsModalFields,
  orderId: number,
  moduleType: OrderModuleType,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
    case 'credit':
      return await sendMailPreview(body, orderId);

    case 'subscription':
      return await sendSubscriptionMailPreview(body, orderId);

    case 'purchase':
      return await sendPurchaseMailPreview(body, orderId);
  }
};

export const resendEmailPreview = async (logId: number): Promise<void> => await resendMailPreview(logId);

export const sendEmailPreviewWithoutCaution = async (
  order_id: number,
  body: {
    language: string;
    template_id: number;
  },
  moduleType: OrderModuleType,
): Promise<void> => {
  switch (moduleType) {
    case 'order-sale':
    case 'credit':
      return await sendMailPreviewWithoutCaution({ ...body, order_id });
    case 'subscription':
      return await sendSubscriptionMailPreviewWithoutCaution(order_id, body);
    case 'purchase':
      return await sendPurchaseMailPreviewWithoutCaution(order_id, body);
  }
};
