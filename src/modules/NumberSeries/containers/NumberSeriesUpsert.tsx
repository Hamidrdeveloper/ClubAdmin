/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import { message } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';

import NumberSeriesForm from '../components/NumberSeriesForm';
import { NumberSeries } from '../model/numberSeries.entity';
import NumberSeriesModule from '../NumberSeries.module';

const NumberSeriesUpsert: React.FC<GlobalUpsertProps<NumberSeries>> = ({ onCallback, singleData }) => {
  const module = new NumberSeriesModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<NumberSeries>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<NumberSeries>) => {
    const { translate, numberSeriesType, numberSeriesPositions, ...restValues } = formValues;

    if (numberSeriesPositions?.find((pos) => pos.increment_by_number > pos.ending_number)) {
      message.error(i18n.t('NumberSeries.IncOnEndingNumberError'));
      return;
    }

    const mappedNumberSeriesPositions = numberSeriesPositions?.map((series) => ({
      ...series,
      company_id: series?.company?.id,
    }));

    const values: Partial<NumberSeries> = {
      ...restValues,
      type_id: numberSeriesType?.id,
      translate: normalizeTranslate(translate),
      numberSeriesPositions: mappedNumberSeriesPositions,
    };
    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <NumberSeriesForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default NumberSeriesUpsert;
