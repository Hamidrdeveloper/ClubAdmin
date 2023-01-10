import i18n from '@src/core/i18n/config';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

import { IncomingItems, IncomingItemsFormCtx } from '../model/incomingItems';

export const bookIncomingItems = async (values: Partial<IncomingItemsFormCtx>): Promise<IncomingItems> => {
  try {
    const response: AxiosResponse<{ data: IncomingItems }> = await axios.post('incoming-journals', values);

    message.success(i18n.t('Global.CreatedSuccessfully', { title: i18n.t('Stock.IncomingItems.Title') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
