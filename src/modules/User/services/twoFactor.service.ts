import axios, { AxiosResponse } from 'axios';

export async function toggle2FAService(userId: number, isChecked: boolean): Promise<number> {
  try {
    const response: AxiosResponse = await axios.put(`users/${userId}/enable-two-factor-authentication`, {
      two_factor_enable: isChecked,
    });
    return response.status;
  } catch (e) {
    throw new Error(e);
  }
}
