/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import PackageForm from '../components/PackageForm';
import { PriceFormContext } from '../model';
import { Package } from '../model/package.entity';
import PackageModule from '../Package.module';

const PackageUpsert: React.FC<GlobalUpsertProps<Package>> = ({ onCallback, singleData }) => {
  const module = new PackageModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Package>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Package>) => {
    const { packingType, translate, ...restValues } = formValues;

    const values: Partial<PriceFormContext> = {
      ...restValues,
      packing_type_id: packingType?.id,
      translate: normalizeTranslate(translate),
    };
    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <PackageForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default PackageUpsert;
