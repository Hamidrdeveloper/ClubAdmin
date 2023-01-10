import { OrderSalePositionPure, OrderSalePure } from '@src/modules/Order';
import { ResponseContext } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import axios, { AxiosResponse } from 'axios';

const API = new ApiBuilder<OrderSalePure>('');

export async function getOrderSales({
  page,
  per_page,
  countryId,
  shippingProfileId,
}: {
  page: number;
  per_page: number;
  countryId?: number;
  shippingProfileId?: number;
}): Promise<ResponseContext<OrderSalePure[]>> {
  const response: AxiosResponse<ResponseContext<OrderSalePure[]>> = await axios.get(`/orders/picks`, {
    params: {
      page,
      per_page,
      countryId,
      shippingProfileId,
      orderStatusSlug: 'picking',
      orderBy: { 'orderSalePositions.order_sale_id': 'DESC' },
    },
  });

  return response.data;
}

//
async function getOrdersFilterByCountry({ countryId }: { countryId: number }): Promise<OrderSalePure[]> {
  return await API.request<OrderSalePure[]>({
    url: '/order-sale',
    method: 'GET',
    params: { countryId: countryId === -1 ? undefined : countryId },
  });
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

type PositionsWithBarcode = OrderSalePositionPure & { barcodes: { value: string }[] };
async function getOrderPositionsByOrderId({ orderId }: { orderId: number }): Promise<PositionsWithBarcode[]> {
  return await API.request<PositionsWithBarcode[]>({
    url: `/order-sales/picks/${orderId}/positions`,
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
export {
  getOrdersFilterByCountry,
  getOrderPositionsByOrderId,
  changeOrderStatusBySlug,
  pickListInvoiceOrder,
  pickListGroupInvoiceOrder,
};
