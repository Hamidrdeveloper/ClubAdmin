import axios, { AxiosResponse } from 'axios';

import { WalletOverViewModel } from '../model/Wallet.entity';

export default async function ({ userId }: { userId: number | string }): Promise<WalletOverViewModel> {
  try {
    const response: AxiosResponse<{ data: WalletOverViewModel }> = await axios.get(`users/${userId}/wallet`);
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}
