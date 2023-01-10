// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import UserTypeForm from '../components/UserTypeForm';
import { UserType } from '../model/userType.entity';
import UserTypeModule from '../UserType.module';

const UserTypeUpsert: React.FC<GlobalUpsertProps<UserType>> = ({ onCallback, closeModal, singleData }) => {
  const module = new UserTypeModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<UserType>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<UserType>) => {
    const values: Partial<UserType> = { ...formValues, translate: normalizeTranslate(formValues.translate) };
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

  return <UserTypeForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default UserTypeUpsert;
