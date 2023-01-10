import axios, { AxiosResponse } from 'axios';

import { BankDetailPure } from '../model/bankDetails';

export const getBankDetails = async ({ userId }: { userId: number }): Promise<BankDetailPure | number> => {
  try {
    // NOTE: validate 404 requests, (bankDetails might not exist)
    const response: AxiosResponse<{ data: BankDetailPure }> = await axios.get(`users/${userId}/user-banks`, {
      validateStatus: (status) => status < 500,
    });
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
