/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import ShelfForm from '../components/ShelfForm';
import { Shelf } from '../model/shelf';
import ShelfModule from '../Shelf.module';

const ShelfUpsert: FC<GlobalUpsertProps<Shelf>> = ({ singleData, onCallback }) => {
  const module = new ShelfModule();
  const { isLoading, mutate } = useMutation(({ id, values }: GlobalMutationProps<Shelf>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Shelf) => {
    const { regal, ...restValues } = formValues;

    const values: Partial<Shelf> = {
      ...restValues,
      regal_id: regal.id,
    };
    mutate({ id: singleData?.id ?? undefined, values }, { onSuccess: onCallback });
  };
  return <ShelfForm isPending={isLoading} onSubmit={handleFormSubmit} initialValues={singleData} />;
};

export default ShelfUpsert;
