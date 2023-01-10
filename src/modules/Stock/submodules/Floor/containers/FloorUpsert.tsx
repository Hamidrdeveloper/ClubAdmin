import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import FloorForm from '../components/FloorForm';
import FloorModule from '../Floor.module';
import { Floor, FloorFormCtx } from '../model/floor';

const FloorUpsert: FC<GlobalUpsertProps<Floor>> = ({ singleData, onCallback }) => {
  const module = new FloorModule();
  const { isLoading, mutate } = useMutation(({ id, values }: GlobalMutationProps<FloorFormCtx>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Floor) => {
    const { building, ...restValues } = formValues;

    const values: Partial<FloorFormCtx> = {
      ...restValues,
      building_id: building?.id,
    };
    mutate({ id: singleData?.id ?? undefined, values }, { onSuccess: onCallback });
  };
  return <FloorForm isPending={isLoading} onSubmit={handleFormSubmit} initialValues={singleData} />;
};

export default FloorUpsert;
