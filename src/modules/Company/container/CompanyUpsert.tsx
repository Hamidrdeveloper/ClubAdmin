/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import CompanyModule from '../Company.module';
import CompanyForm from '../components/CompanyForm';
import { CompanyFormCtx, CompanyModel } from '../model/company.entity';
import { ApiBuilder } from '@src/shared/utils';
import i18n from '@src/core/i18n/config';

const CompanyUpsert = ({ singleData, onCallback,chantId }: GlobalUpsertProps<CompanyModel>): ReactElement => {
  const module = new CompanyModule();
  const entity = 'http://88.198.95.174:2020/ClubAdmin/AddChant_Lyric';
  const entityUpdate = 'http://88.198.95.174:2020/ClubAdmin/EditBoard';

  const title = [i18n.t('ShippingProfile.Title'), i18n.t('ShippingProfile.Title', { count: 2 })];
  const  Api = new ApiBuilder<CompanyModel>(entity, title[0]);

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<CompanyFormCtx>) => {
    return id ? module.apiService.updateOne(id, values) : Api.createOne(values);
  });

  const formSubmitHandler = (formValues: CompanyModel): void => {
    const { countries, currencies, contactGroup, ...restValues } = formValues;
    const date =new Date(formValues.duration_MSC);
    const dateStart =new Date(formValues.startTime_ms);
    const startTime = (parseInt(dateStart.getMinutes()+"")*60000 ) +(parseInt(dateStart.getSeconds()+"")*1000 ) 

    const duration = (parseInt(date.getMinutes()+"")*60000 ) +(parseInt(date.getSeconds()+"")*1000 ) 
    const values: CompanyFormCtx = {
      ...restValues,
      clubId: 1,
      adminId: 12,
      ChantId:chantId,
      startTime_ms:startTime,
      duration_MSC:duration,
    };

    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <CompanyForm onSubmit={formSubmitHandler} initialValues={singleData} isPending={isLoading} />;
};

export default CompanyUpsert;
