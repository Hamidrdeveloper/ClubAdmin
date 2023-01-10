import { GeneralTranslate, GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import LegalConditionForm from '../components/LegalConditionForm';
import LegalConditionModule from '../LegalCondition.module';
import { LegalCondition } from '../model/legalCondition.entity';

const LegalConditionUpsert: React.FC<GlobalUpsertProps<LegalCondition>> = ({
  onCallback,
  singleData,
  module,
}) => {
  const _module = module ?? new LegalConditionModule('');

  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<LegalCondition>) =>
    new LegalConditionModule(_module['name'], true).apiService.createOne(values),
  );

  const handleFormSubmit = (formValues: Partial<LegalCondition>) => {
    const { roles, company, ...restValues } = formValues;

    const values: Partial<LegalCondition> = {
      ...restValues,
      company_id: company?.id,
      role_ids: roles?.map((role) => role.id),
      translate: normalizeTranslate(
        (formValues.translate as GeneralTranslate[]).map((t) => ({ ...t, locale: t.locale?.['locale'] })),
      ),
    };
    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <LegalConditionForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default LegalConditionUpsert;
