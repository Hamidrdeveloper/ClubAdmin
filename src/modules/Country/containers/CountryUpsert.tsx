/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import CountryForm from '../components/CountryForm';
import CountryModule from '../Country.module';
import { Country, CountryFormContext } from '../model';
import i18n from '@src/core/i18n/config';

const CountryUpsert: React.FC<GlobalUpsertProps<Country>> = ({ onCallback, closeModal, singleData ,chantId}) => {
  const module = new CountryModule();
  const entity = 'http://88.198.95.174:2020/ClubAdmin/AddChant_Vibrate';
  const entityUpdate = 'http://88.198.95.174:2020/ClubAdmin/EditBoard';

  const title = [i18n.t('ShippingProfile.Title'), i18n.t('ShippingProfile.Title', { count: 2 })];
  const  Api = new ApiBuilder<Country>(entity, title[0]);
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<CountryFormContext>) => {
    return id ? module.apiService.updateOne(id, values) : Api.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Country>) => {
    const { currency, translate, ...restValues } = formValues;

    const dateStart =new Date(formValues.startTime_ms);
    const startTime = (parseInt(dateStart.getMinutes()+"")*60000 ) +(parseInt(dateStart.getSeconds()+"")*1000 ) 

    const values: Partial<CountryFormContext> = {
      ...restValues,
      clubId: 1,
      adminId: 12,
      ChantId:chantId,
      startTime_ms:startTime,
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

  return <CountryForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default CountryUpsert;
