/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import PartnerForm from '../components/ParnterForm';
import { PartnerFormContext } from '../model';
import { Partner } from '../model/partner.entity';
import PartnerModule from '../Partner.module';

const PartnerUpsert: React.FC<GlobalUpsertProps<Partner>> = ({ onCallback, singleData }) => {
  const module = new PartnerModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Partner>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Partner>) => {
    const { parent, translate, user, front_identity_card_id, ...restValues } = formValues;

    console.log(restValues);

    const values: Partial<PartnerFormContext> = {
      ...restValues,
      user_id: user?.id,
      parent_id: parent?.id,
      front_identity_card_id,
      translate: normalizeTranslate(translate),
    };

    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <PartnerForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default PartnerUpsert;
