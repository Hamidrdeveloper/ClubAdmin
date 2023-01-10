/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import CustomTariffForm from '../components/CustomTariffForm';
import CustomTariffModule from '../CustomTariff.module';
import { CustomTariff } from '../model/customTariff.entity';

const CustomTariffUpsert: React.FC<GlobalUpsertProps<CustomTariff>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const module = new CustomTariffModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<CustomTariff>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<CustomTariff>) => {
    const values: Partial<CustomTariff> = {
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

  return <CustomTariffForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default CustomTariffUpsert;
