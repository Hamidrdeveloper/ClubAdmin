import { OrderSalePositionPure, OrderSalePure } from '@src/modules/Order';
import { ApiBuilder } from '@src/shared/utils';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { t } from 'i18next';

import { PackingSerialNumber } from '../model/packer';

const API = new ApiBuilder<OrderSalePure>('');
//
async function getOrdersFilterByPackerSlug(id: string, signal: AbortSignal): Promise<OrderSalePure[]> {
  let response: AxiosResponse<{ data: OrderSalePure[] }>;
  try {
    response = await axios.get(`/orders/packs`, {
      signal,
      params: { ids: [id] },
    });
  } catch {
    return message.warn(t('PackerDashboard.WaitResponse'));
  }

  return response.data.data;
}

async function changeOrderStatusBySlug({
  slug,
  orderId,
}: {
  slug: string | undefined;
  orderId: number;
}): Promise<void> {
  return await API.request<void>({
    url: `/order-sales/${orderId}/update-status-by-slug`,
    method: 'PUT',
    body: { slug },
  });
}

async function getOrderPositionsByOrderId({
  orderId,
}: {
  orderId: number;
}): Promise<OrderSalePositionPure[]> {
  return await API.request<OrderSalePositionPure[]>({
    url: `/order-sales/${orderId}/positions`,
    method: 'GET',
  });
}

async function pickListInvoiceOrder(orderId: number): Promise<string> {
  return (
    await API.request<{ pick_list_document_link: string }>({
      url: `order-sales/${orderId}/pick-list-document`,
      method: 'POST',
    })
  ).pick_list_document_link;
}

async function pickListGroupInvoiceOrder(order_ids: number[]): Promise<string> {
  return (
    await API.request<{ pick_list_document_link: string }>({
      url: `order-sales/group-pick-list-document`,
      body: { order_ids },
      method: 'POST',
    })
  ).pick_list_document_link;
}

async function addSerialNumberToPosition(items: PackingSerialNumber[]): Promise<PackingSerialNumber[]> {
  return await API.request<PackingSerialNumber[]>({
    url: `serial-numbers/bulk-add`,
    body: { items },
    method: 'POST',
  });
}

export {
  getOrdersFilterByPackerSlug,
  getOrderPositionsByOrderId,
  changeOrderStatusBySlug,
  pickListInvoiceOrder,
  pickListGroupInvoiceOrder,
  addSerialNumberToPosition,
};
