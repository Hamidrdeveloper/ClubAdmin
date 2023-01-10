/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import PaymentMethodForm from '../components/PaymentMethodForm';
import { PaymentMethodFormContext } from '../model';
import { PaymentMethod } from '../model/paymentMethod.entity';
import PaymentMethodModule from '../PaymentMethod.module';
import i18n from '@src/core/i18n/config';

const PaymentMethodUpsert: React.FC<GlobalUpsertProps<PaymentMethod>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const module = new PaymentMethodModule();
  const entity = 'http://88.198.95.174:2020/ClubAdmin/AddTeam';
  const entityEdit = 'http://88.198.95.174:2020/ClubAdmin/EditTeam';

  const title = [i18n.t('Referrer.Title'), i18n.t('Referrer.Title', { count: 2 })];

  const  Api = new ApiBuilder<PaymentMethod>(entity, title[0]);
  const  ApiUpdate = new ApiBuilder<PaymentMethod>(entityEdit, title[0]);

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<PaymentMethod>) => {
    return id ? ApiUpdate.createOne(values) : Api.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<PaymentMethod>) => {
    const { price, paymentMethodType, company, file_path, file_id, ...restFormValues } = formValues;

    let values: Partial<PaymentMethodFormContext>;
    if(singleData){
      values ={
        ...restFormValues,
         clubId:1,
         adminId:12,
         teamId:singleData.id
      };
    }else{
      values ={
        ...restFormValues,
         clubId:1,
         adminId:12,
      };
    }

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

  return <PaymentMethodForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default PaymentMethodUpsert;
