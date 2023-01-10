/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import CustomerStepForm from '../components/CustomerStepForm';
import CustomerStepModule from '../CustomerStep.module';
import { CustomerStepModel } from '../model/CustomerStep.entity';

const CustomerStepUpsert: React.FC<GlobalUpsertProps<CustomerStepModel>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const module = new CustomerStepModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<CustomerStepModel>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<CustomerStepModel>) => {
    const { voucher_level, id_account_minus_value, translate } = formValues;
    const values: Partial<CustomerStepModel> = {
      voucher_level,
      id_account_minus_value,
      translate: normalizeTranslate(translate),
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

  return <CustomerStepForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default CustomerStepUpsert;
