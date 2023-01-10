/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import ReferrerForm from '../components/Referrer.form';
import { Referrer } from '../model/Referrer.entity';
import ReferrerModule from '../Referrer.module';
import { ApiBuilder } from '@src/shared/utils';
import i18n from '@src/core/i18n/config';

const ReferrerUpsert: FC<GlobalUpsertProps<Referrer>> = ({ onCallback, closeModal, singleData }) => {
  const module = new ReferrerModule();
  const entity = 'http://88.198.95.174:2020/ClubAdmin/AddChantType';
  const title = [i18n.t('Referrer.Title'), i18n.t('Referrer.Title', { count: 2 })];
  const entityEdit = 'http://88.198.95.174:2020/ClubAdmin/EditChantType';

  const  Api = new ApiBuilder<Referrer>(entity, title[0]);
  const  ApiEdit = new ApiBuilder<Referrer>(entityEdit, title[0]);

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Referrer>) => {
    return id ? ApiEdit.createOne(values) : Api.createOne(values);
  });

  const handleFormSubmit = (restFormValues: Partial<Referrer>) => {
   
    console.log('====================================');
    console.log(restFormValues);
    console.log('====================================');
    let values: Partial<Referrer>;
    if(singleData){
      values ={
        ...restFormValues,
         clubId:1,
         adminId:12,
         chantTypeId:singleData.id
      };
    }else{
      values ={
        ...restFormValues,
         clubId:1,
         adminId:12,
      };
    }

    mutate(
      {
        id: singleData ? singleData.id : undefined,
        values: values,
      },
      {
        onSuccess: (data) => {
          onCallback?.(data);
          closeModal?.();
        },
      },
    );
  };

  return <ReferrerForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default ReferrerUpsert;
