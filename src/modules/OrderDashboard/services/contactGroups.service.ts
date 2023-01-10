import { AddressPure } from '@modules/User/model/address';
import { ResponseContext } from '@shared/models';
import axios, { AxiosResponse } from 'axios';

export const getUserContactGroup = async (id: number): Promise<ResponseContext<AddressPure[]>> => {
  try {
    const response: AxiosResponse<ResponseContext<AddressPure[]>> = await axios.get(
      `/user/${id}/contact-groups`,
    );
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
