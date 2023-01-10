import { User, UserConfig } from '@core/Authentication/model';
import { ResponseContext } from '@shared/models';
import axios, { AxiosResponse } from 'axios';

export const getUsers = async (search: string): Promise<ResponseContext<User[]>> => {
  try {
    const response: AxiosResponse<ResponseContext<User[]>> = await axios.get(
      `/users/list-create-order?search=${search}&isActive=true`,
    );

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getUserConfig = async (): Promise<{ data: UserConfig }> => {
  try {
    const response: AxiosResponse<{ data: UserConfig }> = await axios.get(`/configs/data`);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
