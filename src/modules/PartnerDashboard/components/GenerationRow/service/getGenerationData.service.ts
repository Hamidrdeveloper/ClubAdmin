import axios, { AxiosResponse } from 'axios';

import { AllGenerationsDataModel } from '../model/generation.entity';

export async function getGenerationsData(
  partnerId: number,
  params: Record<string, unknown>,
): Promise<AllGenerationsDataModel> {
  try {
    const response: AxiosResponse<{ data: { generations: AllGenerationsDataModel } }> = await axios.get(
      `partner-dashboard/${partnerId}/generation`,
      { params },
    );

    return response.data.data.generations;
  } catch (e) {
    throw new Error(e);
  }
}
