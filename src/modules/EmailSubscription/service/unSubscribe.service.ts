import axios, { AxiosResponse } from 'axios';

export default async function unsubscribeEmail(email: string): Promise<number> {
  try {
    const response: AxiosResponse = await axios.post('unsubscribe', { email });
    return response.status;
  } catch (e) {
    throw new Error(e);
  }
}
