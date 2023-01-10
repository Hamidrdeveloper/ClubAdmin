import i18n from '@src/core/i18n/config';
import { User } from '@src/modules/User';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

type Props = {
  id: number;
  userIds: number[];
};
export async function updateUserBlacklist({ id, userIds }: Props): Promise<number> {
  try {
    const response: AxiosResponse<{ data: unknown }> = await axios.put(`competitions/${id}/blacklist-users`, {
      user_ids: userIds,
    });

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Competition.UserBlacklist') }));
    return response.status;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getUserBlacklist(id: number): Promise<User[]> {
  try {
    const response: AxiosResponse<{ data: User[] }> = await axios.get(`competitions/${id}/blacklist-users`);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}
