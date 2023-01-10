/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import StatusForm from '../components/StatusForm';
import { Status } from '../model/status.entity';
import StatusModule from '../Status.module';

const StatusUpsert: React.FC<GlobalUpsertProps<Status>> = ({ onCallback, closeModal, singleData }) => {
  const module = new StatusModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Status>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Status>) => {
    const values: Partial<Status> = { ...formValues, translate: normalizeTranslate(formValues.translate) };
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

  return <StatusForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default StatusUpsert;
