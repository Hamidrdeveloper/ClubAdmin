/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useMutation } from 'react-query';

import PaymentTermForm from '../components/PaymentMethodTypeForm';
import { PaymentMethodType } from '../model/paymentMethodType.entity';
import PaymentTermModule from '../PaymentMethodType.module';

const PaymentMethodTypeUpsert: React.FC<GlobalUpsertProps<PaymentMethodType>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const module = new PaymentTermModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<PaymentMethodType>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<PaymentMethodType>) => {
    const values: Partial<PaymentMethodType> = { ...formValues };
    mutate(
      { id: singleData ? singleData.id : undefined, values },
      {
        onSuccess: (data) => {
          onCallback?.(data);
          closeModal?.();
        },
      },
    );
  };

  return <PaymentTermForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default PaymentMethodTypeUpsert;
