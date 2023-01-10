/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import PackingTypeForm from '../components/PackingTypeForm';
import { PackingType } from '../model/packingType.entity';
import PackingTypeModule from '../PackingType.module';

const PackingTypeUpsert: React.FC<GlobalUpsertProps<PackingType>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const module = new PackingTypeModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<PackingType>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<PackingType>) => {
    const values: Partial<PackingType> = {
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

  return <PackingTypeForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default PackingTypeUpsert;
