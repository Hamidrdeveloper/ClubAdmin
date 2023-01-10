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
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import { notification } from 'antd';
import React, { FC, useState } from 'react';
import { useMutation } from 'react-query';

import AvailabilityModule from '../Availability.module';
import AvailabilityForm from '../components/AvailabilityForm';
import { Availability } from '../model/Availability.entity';
import i18n from '@src/core/i18n/config';

const AvailabilityUpsert: FC<GlobalUpsertProps<Availability>> = ({ onUpdate, closeModal, singleData }) => {
  const module = new AvailabilityModule();
  const entity = 'http://88.198.95.174:2020/ClubAdmin/AddChant';
  const entityUpdate = 'http://88.198.95.174:2020/ClubAdmin/EditBoard';
   const [isLoadingTwo, setLoadingTwo] = useState(false)
  const title = [i18n.t('ShippingProfile.Title'), i18n.t('ShippingProfile.Title', { count: 2 })];
  const  Api = new ApiBuilder<Availability>(entity, title[0]);
  const  ApiUpdate = new ApiBuilder<Availability>(entityUpdate, title[0]);

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Availability>) => {
    return id ? ApiUpdate.updateOne(id, values) : Api.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Availability>) => {
    console.log(formValues);
    setLoadingTwo(true)
    // const { file, file_id, ...restFormValues } = formValues;
    let values: Partial<Availability>;
    const date =new Date(formValues.duration_MSC);
    const time = (parseInt(date.getMinutes()+"")*60000 ) +(parseInt(date.getSeconds()+"")*1000 ) 
    if (singleData?.id) {
      values ={
        ...formValues,
        clubId: 1,
        adminId: 12,
        ChantTypeId:formValues.chantTypeId.id,
        ChantId:singleData.id,
        duration_MSC:time,
      };
    } else {
       values ={
        ...formValues,
        clubId: 1,
        adminId: 12,
        chantTypeId:formValues?.chantTypeId?.id,
        duration_MSC:time,
      };
    }
      mutate(
        { id: singleData ? singleData.id : undefined, values },
        {
          onSuccess: (data) => {
            onUpdate(data);
            onCallback?.(data);
            closeModal?.();
          },
        },
      );
      setLoadingTwo(false)
    // }
  };

  return <AvailabilityForm onChange={onUpdate} initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoadingTwo} />;
};

export default AvailabilityUpsert;
