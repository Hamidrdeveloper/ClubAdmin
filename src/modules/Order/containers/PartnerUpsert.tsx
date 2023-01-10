/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { PartnerSalePure } from '@modules/Order';
import { Loader } from '@shared/components';
import { AuthContext } from '@src/core';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { message } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';

import PartnerForm from '../components/PartnerForm';
import PartnerModule from '../Partner.module';

const PartnerUpsert: React.FC<GlobalUpsertProps<PartnerSalePure>> = ({ onCallback, singleData }) => {
  const module = new PartnerModule();

  const { profile } = useContext(AuthContext);

  const isPartnerReadOnly = !!profile.roles.find((role) => role.slug === 'partner');

  useEffect(() => {
    if (isPartnerReadOnly) createNewPartnerPOST(profile);
  }, [isPartnerReadOnly]);

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<PartnerSalePure>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<PartnerSalePure>) => {
    createNewPartnerPOST(formValues.user);
  };

  function createNewPartnerPOST(user?: { id: number; invoice_contact_group_id: number }) {
    if (!user?.invoice_contact_group_id) {
      message.error("Your User doesn't have any contact group!");
    }

    mutate(
      {
        values: {
          user_id: user?.id ?? undefined,
          invoice_contact_group_id: user?.invoice_contact_group_id ?? undefined,
        },
      },
      { onSuccess: onCallback, onError: onCallback },
    );
  }

  return isPartnerReadOnly ? (
    <Loader title={'Creating New Order Partner...'} />
  ) : (
    <PartnerForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />
  );
};

export default PartnerUpsert;
