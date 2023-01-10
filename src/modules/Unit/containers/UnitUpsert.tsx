// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import UnitForm from '../components/UnitForm';
import { Unit } from '../model/unit.entity';
import UnitModule from '../Unit.module';

const UnitUpsert: FC<GlobalUpsertProps<Unit>> = ({ onCallback, closeModal, singleData }) => {
  const module = new UnitModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Unit>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (values: Partial<Unit>) => {
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

  return <UnitForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default UnitUpsert;
