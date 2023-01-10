import { ApiBuilder } from '@src/shared/utils';
import axios, { AxiosResponse } from 'axios';

import { User, UserFormCtx } from '../model';
import { SetProfileFormCtx } from '../model/address';

export const setUserProfilePic = async ({
  userId,
  fileId,
}: {
  userId: number;
  fileId: number | null;
}): Promise<SetProfileFormCtx> => {
  const updateProfileAPI = new ApiBuilder<SetProfileFormCtx>(`users/${userId}/profile-image`);
  try {
    return updateProfileAPI.request({
      url: `/users/${userId}/profile-image`,
      body: { file_id: fileId },
      method: 'PUT',
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const createPartner = async (values: Partial<UserFormCtx>): Promise<User> => {
  try {
    const response: AxiosResponse<{ data: User }> = await axios.post(`users/partners`, values);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const quitPartner = async (
  partnerId: number | undefined,
): Promise<{ data: { data: { message: string } } }> => {
  return await axios.put(`partners/${partnerId}/quit`);
};
