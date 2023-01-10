/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import CareerStepModule from '../CareerStep.module';
import CareerStepForm from '../components/CareerStepForm';
import { CareerStep } from '../model/careerstep.entity';

const CareerStepUpsert: React.FC<GlobalUpsertProps<CareerStep>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const module = new CareerStepModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<CareerStep>) => {
    return module.apiService.updateOne(id!, values);
  });

  const handleFormSubmit = (formValues: Partial<CareerStep>) => {
    const { voucher_level, id_account_minus_value, translate } = formValues;
    const values: Partial<CareerStep> = {
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

  return <CareerStepForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default CareerStepUpsert;
