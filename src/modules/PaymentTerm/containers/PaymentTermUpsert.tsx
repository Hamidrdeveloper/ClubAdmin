/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import PaymentTermForm from '../components/PaymentTermForm';
import { PaymentTerm } from '../model/paymentTerm.entity';
import PaymentTermModule from '../PaymentTerm.module';

const PaymentTermUpsert: React.FC<GlobalUpsertProps<PaymentTerm>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const module = new PaymentTermModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<PaymentTerm>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<PaymentTerm>) => {
    const values: Partial<PaymentTerm> = {
      ...formValues,
      translate: normalizeTranslate(formValues.translate),
    };
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

export default PaymentTermUpsert;
