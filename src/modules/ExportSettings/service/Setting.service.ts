import { OrderSalePure } from '@src/modules/Order';
import axios, { AxiosResponse } from 'axios';

import { ExportDataResponseModel, ExportSettingModel } from '../model/ExportsSettings.entity';

export async function getOneExportDataSetting(id: number | string): Promise<ExportSettingModel> {
  try {
    const response: AxiosResponse<ExportSettingModel> = await axios.get(`export-data-settings/${id}`);
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function exportData(settingId: number | string): Promise<string> {
  try {
    const response: AxiosResponse<{ data: ExportDataResponseModel }> = await axios.post(`export-data`, {
      export_data_setting_id: settingId,
    });

    return response.data.data.message;
  } catch (e) {
    throw new Error(e);
  }
}

export async function createNewOrder(exportDataSettingId: number): Promise<unknown> {
  try {
    const response: AxiosResponse<{ data: OrderSalePure }> = await axios.post(
      `export-data-settings/${exportDataSettingId}/create-order-sale`,
    );
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}
