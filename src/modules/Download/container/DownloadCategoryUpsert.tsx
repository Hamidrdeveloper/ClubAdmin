/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import DownloadCategoryForm from '../components/DownloadCategoryForm';
import DownloadCategoryModule from '../Download.module';
import { DownloadCategoryFormCtx, DownloadCategoryModel } from '../model/DownloadCategory.entity';

const { apiService } = new DownloadCategoryModule();
const DownloadCategoryUpsert = ({
  singleData,
  onCallback,
}: GlobalUpsertProps<DownloadCategoryModel>): ReactElement => {
  const { mutate, isLoading } = useMutation(
    ({ id, values }: GlobalMutationProps<DownloadCategoryFormCtx>) => {
      return id ? apiService.updateOne(id, values) : apiService.createOne(values);
    },
  );

  const handleFormSubmit = (formValues: DownloadCategoryModel) => {
    const { parent, ...restValues } = formValues;

    const values: DownloadCategoryFormCtx = {
      parent_id: parent?.id ?? null,
      ...restValues,
    };

    mutate({ id: singleData ? singleData?.id : undefined, values: values }, { onSuccess: onCallback });
  };

  return (
    <DownloadCategoryForm initialValues={singleData} isPending={isLoading} onSubmit={handleFormSubmit} />
  );
};

export default DownloadCategoryUpsert;
