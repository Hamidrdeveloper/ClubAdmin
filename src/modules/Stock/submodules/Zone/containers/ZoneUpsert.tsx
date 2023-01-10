/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import ZoneForm from '../components/ZoneForm';
import { Zone, ZoneFormCtx } from '../model/zone';
import ZoneModule from '../Zone.module';

const ZoneUpsert: FC<GlobalUpsertProps<Zone>> = ({ singleData, onCallback }) => {
  const module = new ZoneModule();
  const { isLoading, mutate } = useMutation(({ id, values }: GlobalMutationProps<ZoneFormCtx>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Zone) => {
    const { floor, ...restValues } = formValues;

    const values: Partial<ZoneFormCtx> = {
      ...restValues,
      floor_id: floor?.id,
    };
    mutate({ id: singleData?.id ?? undefined, values }, { onSuccess: onCallback });
  };
  return <ZoneForm isPending={isLoading} onSubmit={handleFormSubmit} initialValues={singleData} />;
};

export default ZoneUpsert;
