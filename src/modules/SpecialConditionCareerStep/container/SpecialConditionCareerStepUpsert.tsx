/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import SpecialConditionCareerStepForm from '../components/SpecialConditionCareerStepForm';
import {
  SpecialConditionCareerStepFormCtx,
  SpecialConditionCareerStepModel,
} from '../model/SpecialConditionCareerStep.entity';
import SpecialConditionCareerStepModule from '../SpecialConditionCareerStep.module';

const SpecialConditionCareerStepUpsert: FC<GlobalUpsertProps<SpecialConditionCareerStepModel>> = ({
  singleData,
  onCallback,
}) => {
  const { apiService } = new SpecialConditionCareerStepModule();

  const { mutate, isLoading } = useMutation(
    ({ id, values }: GlobalMutationProps<SpecialConditionCareerStepFormCtx>) => {
      return id ? apiService.updateOne(id, values) : apiService.createOne(values);
    },
  );

  const handleFormSubmit = (formValues: Partial<SpecialConditionCareerStepModel>) => {
    const { careerStep, from_to_date_range, ...restValues } = formValues;

    const [fromDate, toDate] = [
      from_to_date_range?.[0].format('YYYY-MM-DD'),
      from_to_date_range?.[1].format('YYYY-MM-DD'),
    ];

    const values: Partial<SpecialConditionCareerStepFormCtx> = {
      ...restValues,
      to: toDate,
      from: fromDate,
      career_step_id: careerStep?.id,
    };

    mutate({ id: singleData?.id ?? undefined, values }, { onSuccess: onCallback });
  };

  return (
    <SpecialConditionCareerStepForm
      initialValues={singleData}
      isPending={isLoading}
      onSubmit={handleFormSubmit}
    />
  );
};

export default SpecialConditionCareerStepUpsert;
