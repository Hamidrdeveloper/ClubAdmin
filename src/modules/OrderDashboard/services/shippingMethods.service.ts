import { ShippingProfilePure } from '@modules/ShippingProfile';
import { ResponseContext } from '@shared/models';
import axios, { AxiosResponse } from 'axios';

export const getShippingMethods = async (): Promise<ResponseContext<ShippingProfilePure[]>> => {
  try {
    const response: AxiosResponse<ResponseContext<ShippingProfilePure[]>> = await axios.get(
      `/ClubAdmin/GetAllBoards`,
    );

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
