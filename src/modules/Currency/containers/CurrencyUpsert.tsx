/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import CurrencyForm from '../components/CurrencyForm';
import CurrencyModule from '../Currency.module';
import { Currency } from '../model/currency.entity';
import i18n from '@src/core/i18n/config';

const CurrencyUpsert: React.FC<GlobalUpsertProps<Currency>> = ({ onCallback, closeModal, singleData ,chantId}) => {
  const module = new CurrencyModule();
  const entity = 'http://88.198.95.174:2020/ClubAdmin/AddChant_Light';
  const entityUpdate = 'http://88.198.95.174:2020/ClubAdmin/EditBoard';

  const title = [i18n.t('ShippingProfile.Title'), i18n.t('ShippingProfile.Title', { count: 2 })];
  const  Api = new ApiBuilder<Currency>(entity, title[0]);
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Currency>) => {
    return id ? module.apiService.updateOne(id, values) :Api.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Currency>) => {
    const dateStart =new Date(formValues.startTime_ms);
    const startTime = (parseInt(dateStart.getMinutes()+"")*60000 ) +(parseInt(dateStart.getSeconds()+"")*1000 ) 
    const values: Partial<Currency> = { ...formValues,
      clubId: 1,
      adminId: 12,
      ChantId:chantId,
      startTime_ms:startTime};
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

  return <CurrencyForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default CurrencyUpsert;
