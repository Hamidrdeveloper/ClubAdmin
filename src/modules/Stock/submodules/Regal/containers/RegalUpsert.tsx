import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import RegalForm from '../components/RegalForm';
import { Regal, RegalFormCtx } from '../model/Regal';
import RegalModule from '../Regal.module';

const RegalUpsert: FC<GlobalUpsertProps<Regal>> = ({ singleData, onCallback }) => {
  const module = new RegalModule();
  const { isLoading, mutate } = useMutation(({ id, values }: GlobalMutationProps<RegalFormCtx>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Regal) => {
    const { zone, ...restValues } = formValues;

    const values: Partial<RegalFormCtx> = {
      zone_id: zone.id,
      ...restValues,
    };
    mutate({ id: singleData?.id ?? undefined, values }, { onSuccess: onCallback });
  };
  return <RegalForm isPending={isLoading} onSubmit={handleFormSubmit} initialValues={singleData} />;
};

export default RegalUpsert;
