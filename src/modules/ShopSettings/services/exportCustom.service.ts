import { OrderStatus } from '@src/modules/Order';
import { OrderStatusChildModule } from '@src/modules/Order/Order.module';
import axios from 'axios';

import { CustomExportModel } from '../model/customExport.entity';

export async function exportCustomDocument(
  order_user_id: number,
  order_status_id: number,
): Promise<CustomExportModel> {
  return await axios.put('/settings/export-custom', {
    data: {
      order_user_id,
      order_status_id,
    },
    slug: 'export-custom',
  });
}

export async function getCustomDocument(): Promise<{ data: CustomExportModel }> {
  return await axios.get('/settings/export-custom');
}

export async function getUser(id: number | null): Promise<any> {
  return await axios.get(`users/${id}`);
}

export async function getOrderStatuses(): Promise<OrderStatus[]> {
  const module = new OrderStatusChildModule();
  return (await module.apiService.getAll({ pagination: { per_page: 100 } })).data;
}
