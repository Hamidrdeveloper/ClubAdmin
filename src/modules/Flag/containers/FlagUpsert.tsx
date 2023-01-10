/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import FlagForm from '../components/FlagForm';
import FlagModule from '../Flag.module';
import { Flag } from '../model/flag.entity';
import i18n from '@src/core/i18n/config';

const FlagUpsert: React.FC<GlobalUpsertProps<Flag>> = ({chantId, onCallback, singleData }) => {
  const module = new FlagModule();
  const entity = 'http://88.198.95.174:2020/ClubAdmin/AddChant_Audio';
  const entityUpdate = 'http://88.198.95.174:2020/ClubAdmin/EditBoard';

  const title = [i18n.t('ShippingProfile.Title'), i18n.t('ShippingProfile.Title', { count: 2 })];
  const  Api = new ApiBuilder<Flag>(entity, title[0]);
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Flag>) => {
    return id ? module.apiService.updateOne(id, values) : Api.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Flag>) => {

    const date =new Date(formValues.duration_MSC);
    const dateStart =new Date(formValues.startTime_ms);
    const startTime = (parseInt(dateStart.getMinutes()+"")*60000 ) +(parseInt(dateStart.getSeconds()+"")*1000 ) 

    const duration = (parseInt(date.getMinutes()+"")*60000 ) +(parseInt(date.getSeconds()+"")*1000 ) 
    const values: Partial<Flag> = {
      ...formValues,
      clubId: 1,
      adminId: 12,
      chantId:chantId,
      duration_MSC:duration,
      startTime_ms:startTime,
    };
    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <FlagForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default FlagUpsert;
