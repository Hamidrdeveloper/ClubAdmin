import axios, { AxiosResponse } from 'axios';

import { ExportTypeModel } from '../model/ExportsTypes.entity';

interface Props extends Pick<ExportTypeModel, 'headers'> {
  typeId: number;
}
export async function updateExportTypeHeaders({ typeId, headers }: Props): Promise<ExportTypeModel> {
  try {
    const response: AxiosResponse<ExportTypeModel> = await axios.put(`export-data-types/${typeId}`, {
      headers,
    });

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}
