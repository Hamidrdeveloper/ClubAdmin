import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { FactoryChild, GlobalMutationProps } from '@src/shared/models';
import { Modal } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import OrderPaymentForm from '../../components/OrderPayment/OrderPaymentForm';
import { OrderPaymentFormContext, OrderPaymentFormContextArgs, OrderPaymentPure } from '../..';

interface UpsertProps<T> {
  id: number;
  isVisible: boolean;
  isCredit: boolean;
  module: FactoryChild<T>;
  onCallback: (data: T) => void;
  setVisible: (value: boolean) => void;
  singleData: Partial<OrderPaymentFormContext>;
}

const OrderPaymentUpsert: FC<UpsertProps<OrderPaymentPure>> = ({
  id,
  module,
  singleData,
  onCallback,
  setVisible,
  isVisible,
  isCredit,
}) => {
  const { t } = useTranslation();
  const title = module.title[0];

  const { mutate, isLoading } = useMutation(
    ({ values }: GlobalMutationProps<OrderPaymentFormContextArgs>) => {
      return module.apiService.createOne(values);
    },
  );

  const handleFormSubmit = (formValues: Partial<OrderPaymentFormContext>) => {
    const { currency, payment_method, ...restValues } = formValues;

    const values: Partial<OrderPaymentFormContextArgs> = {
      currency_id: currency?.id,
      payment_method_id: payment_method?.id,
      ...restValues,
    };

    mutate({ values }, { onSuccess: onCallback });
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <Modal
      width={1300}
      footer={false}
      destroyOnClose
      closable={false}
      onCancel={handleClose}
      visible={isVisible}
      title={
        <ModalHeader
          onClose={handleClose}
          items={[
            ...(module.breadcrumbItems || []),
            { path: '', breadcrumbName: t('Global.CreateTitle', { title }) },
          ]}
        />
      }
    >
      <OrderPaymentForm
        initialValues={{ ...singleData, price_value: Math.abs(singleData.price_value ?? 0) }}
        onSubmit={handleFormSubmit}
        orderId={id}
        isCredit={isCredit}
        isPending={isLoading}
      />
    </Modal>
  );
};

export default OrderPaymentUpsert;
