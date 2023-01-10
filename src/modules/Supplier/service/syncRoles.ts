import i18n from '@src/core/i18n/config';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

type Props = {
  userId: number;
  roleIds: number[];
};
export default async function syncRolesService({ userId, roleIds }: Props): Promise<unknown> {
  try {
    const response: AxiosResponse<{ data: unknown }> = await axios.put(`users/${userId}/roles`, {
      role_ids: [...roleIds],
    });

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Supplier.CompanyInfo.Roles') }));
    return response.status;
  } catch (e) {
    throw new Error(e);
  }
}
