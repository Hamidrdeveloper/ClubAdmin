/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import PriceTypeForm from '../components/PriceTypeForm';
import { PriceType } from '../model/priceType.entity';
import PriceTypeModule from '../PriceType.module';

const PriceTypeUpsert: FC<GlobalUpsertProps<PriceType>> = ({ onCallback, closeModal, singleData }) => {
  const module = new PriceTypeModule();
  const entity = 'http://88.198.95.174:2020/ClubAdmin/AddEvent';
  const entityEdit = 'http://88.198.95.174:2020/ClubAdmin/EditEvent';

  const title = [i18n.t('Referrer.Title'), i18n.t('Referrer.Title', { count: 2 })];

  const Api = new ApiBuilder<PriceType>(entity, title[0]);
  const ApiEdit = new ApiBuilder<PriceType>(entityEdit, title[0]);

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<PriceType>) => {
    return id ? ApiEdit.createOne(values) : Api.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<PriceType>) => {
    let values: Partial<PriceType>;
    if (singleData) {
      values = {
        ...formValues,
        hostTeamId: formValues.hostTeamId.id?formValues.hostTeamId.id:singleData.hostTeamId,
        guestTeamId: formValues.guestTeamId.id? formValues.guestTeamId.id:singleData.guestTeamId,
        startTime: new Date(formValues.startTime).toISOString(),
        endTime: new Date(formValues.endTime).toISOString(),
        status:formValues.status.status? formValues.status.status:singleData.status,
        adminId: 12,
        clubId: 1,
        eventId:singleData.id
      };
    } else {
      values = {
        ...formValues,
        hostTeamId: formValues.hostTeamId.id,
        guestTeamId: formValues.guestTeamId.id,
        startTime: new Date(formValues.startTime).toISOString(),
        endTime: new Date(formValues.endTime).toISOString(),
        status: formValues.status.status,
        adminId: 12,
        clubId: 1,
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

  return <PriceTypeForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default PriceTypeUpsert;
