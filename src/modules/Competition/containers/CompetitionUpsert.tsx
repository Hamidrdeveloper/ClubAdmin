/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import { message } from 'antd';
import moment from 'moment';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import CompetitionModule from '../Competition.module';
import CompetitionForm from '../components/CompetitionForm';
import { CompetitionFormCtx, CompetitionModel } from '../model/Competition.entity';

interface Props extends GlobalUpsertProps<CompetitionModel> {
  onError: () => void;
}

const CompetitionUpsert = ({ onCallback, onError, singleData }: Props): ReactElement => {
  const module = new CompetitionModule();

  // FIXME: from backend: 403 Forbidden on update
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<CompetitionFormCtx>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: CompetitionModel) => {
    const { translations, available_until, release_date, ...restValues } = formValues;

    if (available_until && release_date)
      if (available_until < release_date) {
        message.error(i18n.t('Competition.WrongDateMsg'));
        return;
      }

    const values: CompetitionFormCtx = {
      translate: normalizeTranslate(translations),
      release_date: moment(release_date).format('YYYY-MM-DD'),
      available_until: moment(available_until).format('YYYY-MM-DD'),
      ...restValues,
    };

    mutate({ id: singleData?.id ?? undefined, values }, { onSuccess: onCallback, onError: onError });
  };

  return <CompetitionForm onSubmit={handleFormSubmit} isPending={isLoading} initialValues={singleData} />;
};

export default CompetitionUpsert;
