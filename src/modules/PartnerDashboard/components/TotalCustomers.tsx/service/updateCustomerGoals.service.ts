import axios, { AxiosResponse } from 'axios';

import { CustomerGoalsFormCtx } from '../model/customerGoals.entity';

type Props = {
  partnerId: number;
  values: CustomerGoalsFormCtx;
};
export async function updateCustomerGoalsService({ partnerId, values }: Props): Promise<number> {
  try {
    const response: AxiosResponse<{ data: unknown }> = await axios.put(
      `partners/${partnerId}/save-data`,
      values,
    );

    return response.status;
  } catch (e) {
    throw new Error(e);
  }
}
