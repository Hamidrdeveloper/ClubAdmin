import { Subdomain } from '@src/modules/Subdomain';
import axios, { AxiosResponse } from 'axios';

export async function getPartnerSubdomains(partnerId: number): Promise<Subdomain[]> {
  try {
    const response: AxiosResponse<{ data: Subdomain[] }> = await axios.get('subdomains', {
      params: { partnerId },
    });

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}
