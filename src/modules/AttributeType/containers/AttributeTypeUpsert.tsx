/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import AttributeTypeModule from '../AttributeType.module';
import AttributeTypeForm from '../components/AttributeTypeForm';
import { AttributeTypeFormCtx } from '../model';
import { AttributeTypes } from '..';
import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';

const AttributeTypeUpsert: FC<GlobalUpsertProps<AttributeTypes>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const entity = 'http://88.198.95.174:2020/ClubAdmin/AddEvent_Chant';
  const entityEdit = 'http://88.198.95.174:2020/ClubAdmin/EditEvent_Chant';
  const title = [i18n.t('AttributeType.Title'), i18n.t('AttributeType.Title', { count: 2 })];
  const module = new AttributeTypeModule(entity,title[0]);
  const api =new ApiBuilder<AttributeTypes>(entity, title[0]);
  const apiEdit =new ApiBuilder<AttributeTypes>(entityEdit, title[0]);

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<AttributeTypes>) => {
    return id ? apiEdit.createOne(values) : api.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<AttributeTypes>) => {
    const { productVariationCategories: PVC, subdomain, partner, position, ...restValues } = formValues;

    
    let values:Partial<AttributeTypeFormCtx>
    if(singleData){
      values ={
        ...restValues,
        adminId:12,
        clubId:1,
        chantId:formValues.chantId.id?formValues.chantId.id:singleData.chantId,
        eventId:formValues.eventId.id?formValues.eventId.id:singleData.eventId,
        countDownStartTime:new Date(formValues.countDownStartTime).toISOString(),
        startTime:new Date(formValues.startTime).toISOString(),
        Event_ChantId:singleData.id
      };
    }else{
      values ={
        ...restValues,
      adminId:12,
      clubId:1,
      chantId:formValues.chantId.id,
      eventId:formValues.eventId.id,
      countDownStartTime:new Date(formValues.countDownStartTime).toISOString(),
      startTime:new Date(formValues.startTime).toISOString()
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

  return <AttributeTypeForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default AttributeTypeUpsert;
