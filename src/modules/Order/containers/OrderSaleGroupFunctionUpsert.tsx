import { Loader } from '@src/shared/components';
import { message, notification } from 'antd';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';

import OrderSaleGroupFunctionForm from '../components/OrderSaleGroupFunctionForm';
import { updateBulkOrderSale } from '../services/order.service';

interface Props {
  groupFunctionIds: number[];
  setModalVisible: (isModalVisible: boolean) => void;
}
const OrderSaleGroupFunctionUpsert = ({ groupFunctionIds, setModalVisible }: Props): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formFields, setFormFields] = useState<string[]>([]);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<{ data: { data: Array<[string[]]> } }>('/order-sales/bulk-update-fields')
      .then((response) => {
        setFormFields(response?.data?.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        notification.error(error?.message);
        setLoading(false);
      });
  }, []);

  const handlerSubmitForm = (data: any): void => {
    setPending(true);
    const formValues = { order_ids: groupFunctionIds };
    if (data['order_status_id']) {
      formValues['order_status_id'] = data?.order_status_id?.id;
    }

    if (data['language_id']) {
      formValues['language_id'] = data?.language_id?.id;
    }

    if (data['flag_ids'] && data['flag_ids']?.length > 0) {
      formValues['flag_ids'] = data?.flag_ids?.map((flag) => flag?.id);
    }

    updateBulkOrderSale(formValues)
      .then((response) => {
        message.success(response?.message);
        setPending(false);
        setModalVisible(false);
      })
      .catch((error) => {
        notification.error(error.message);
        setPending(false);
        setModalVisible(false);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <OrderSaleGroupFunctionForm pending={pending} formFields={formFields} onSubmit={handlerSubmitForm} />
  );
};

export default OrderSaleGroupFunctionUpsert;
