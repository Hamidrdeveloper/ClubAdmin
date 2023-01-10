import i18n from '@src/core/i18n/config';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

import { Supplier } from '../model';

type Props = {
  supplierId: number;
  flagIds: number[];
};
export default async function syncFlagsService({ supplierId, flagIds }: Props): Promise<Supplier> {
  try {
    const response: AxiosResponse<{ data: Supplier }> = await axios.put(`suppliers/${supplierId}/flags`, {
      flag_ids: [...flagIds],
    });

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Supplier.CompanyInfo.Flags') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}
