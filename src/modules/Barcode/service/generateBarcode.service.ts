import axios, { AxiosResponse } from 'axios';

import { BarcodeGenerateModel } from '../model/barcode.entity';

export async function generateBarcodeService(values: BarcodeGenerateModel): Promise<string> {
  try {
    const response: AxiosResponse<{ data: { message: string } }> = await axios.post(
      'barcodes/bulk-generate',
      values,
    );

    return response.data.data.message;
  } catch (e) {
    throw new Error(e);
  }
}
