/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import RoleForm from '../components/RoleForm';
import { RoleFormContext } from '../model/role-args.entity';
import { Role } from '../model/role.entity';
import RoleModule from '../Role.module';
import i18n from '@src/core/i18n/config';

const RoleUpsert: React.FC<GlobalUpsertProps<Role>> = ({ onCallback, closeModal, singleData }) => {
  const module = new RoleModule();
  const entityEdit = 'http://88.198.95.174:2020/ClubAdmin/EditVideo';

  const title = [i18n.t('Referrer.Title'), i18n.t('Referrer.Title', { count: 2 })];

  const ApiEdit = new ApiBuilder<Role>(entityEdit, title[0]);
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<RoleFormContext>) => {
    return id ? ApiEdit.createOne(values) : ApiEdit.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Role>, targetKeys: number[]) => {
    const { translate, ...restValues } = formValues;

    const values: Partial<RoleFormContext> = {
      ...restValues,
      videoId:singleData.id,
      adminId:12,
      clubId:1,
    };
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

  return <RoleForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default RoleUpsert;
