import { Env } from '@src/core';
import { ResponseContext } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import axios, { AxiosResponse } from 'axios';

import { ABill, ABillCreationModel, Bill } from '../model/bill.entity';

const ABillsAPI = new ApiBuilder<ABill>('/abills');
export async function getAllAbills({
  page,
  params,
}: {
  page: number;
  params: Record<string, any>;
}): Promise<ResponseContext<ABill[]>> {
  const pagination = { page, per_page: 25 };

  const result = await ABillsAPI.getAll({
    pagination,
    orderBy: params.orderBy,
    params: { ...params, ...pagination, orderBy: undefined },
  });

  return result;
}

const BillsAPI = new ApiBuilder<Bill>('/bills');
export async function getAllBills({
  page,
  params,
}: {
  page: number;
  params: Record<string, any>;
}): Promise<ResponseContext<Bill[]>> {
  const pagination = { page, per_page: 12 };

  const result = await BillsAPI.getAll({
    pagination,
    orderBy: params.orderBy,
    params: { ...params, ...pagination },
  });

  return result;
}

export async function createABills(values: ABillCreationModel): Promise<ABill> {
  try {
    const response: AxiosResponse<{ data: ABill }> = await axios.post('/abills', { ...values });

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

function generatePDFFileFromStream(stream: Blob) {
  const file = new Blob([stream], { type: 'application/pdf' });
  const fileURL = URL.createObjectURL(file);

  return fileURL;
}

export async function createBillPreview(id: number): Promise<string> {
  try {
    const response: AxiosResponse<Blob> = await axios.post(
      `/bill/${id}/abrechnung-document-preview`,
      {
        OrderDocument: {
          created_date: Date.now(),
          comment: 'this abrechnung document',
        },
      },
      {
        responseType: 'blob',
      },
    );

    return generatePDFFileFromStream(response.data);
  } catch (e) {
    throw new Error(e);
  }
}

export async function createBillDownload(id: number): Promise<string> {
  try {
    const response: AxiosResponse<Blob> = await axios.get(`/bill/${id}/abrechnung-download`, {
      responseType: 'blob',
    });

    return generatePDFFileFromStream(response.data);
  } catch (e) {
    throw new Error(e);
  }
}

export async function regenerateBill(id: number): Promise<string> {
  try {
    const response: AxiosResponse<{ data: { link: string } }> = await axios.get(
      `/bill/${id}/abrechnung-document`,
    );

    const fileUrl = response.data.data.link;
    const previewUrl = Env.PURE_URL + fileUrl;

    return previewUrl;
  } catch (e) {
    throw new Error(e);
  }
}
