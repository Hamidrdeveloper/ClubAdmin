/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import Fallback from '@src/modules/Product/components/Fallback';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import BuildingModule from '../Building.module';
import BuildingForm from '../components/BuildingForm';
import { Building } from '../model/Building';

const BuildingUpsert: FC<GlobalUpsertProps<Building>> = ({ onCallback, singleData }) => {
  const { stock_id: warehouse_id } = useParams();
  if (!warehouse_id) return <Fallback />;

  const module = new BuildingModule();

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Building>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Building>) => {
    const values: Partial<Building> = {
      warehouse_id: +warehouse_id,
      ...formValues,
    };

    mutate({ id: singleData?.id ?? undefined, values }, { onSuccess: onCallback });
  };

  return <BuildingForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default BuildingUpsert;
