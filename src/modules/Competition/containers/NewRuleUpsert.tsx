/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement, useState } from 'react';
import { useMutation } from 'react-query';

import Fallback from '../components/Fallback';
import NewRulesForm from '../components/NewRulesForm';
import { RuleFormCtx, RuleModel } from '../model/Rule.entity';
import { competitionIdAtom } from '../service/competitionStore';

const API = new ApiBuilder<RuleModel>('competition-rules', i18n.t('Competition.Rule.Title'));

const NewRulesUpsert = ({
  onCallback,
  singleData: _singleData,
}: GlobalUpsertProps<RuleModel>): ReactElement => {
  const [competitionId] = useAtom(competitionIdAtom);

  if (!competitionId && !_singleData?.competition_id) {
    return <Fallback title={'competition ID'} />;
  }
  const compId = competitionId ?? _singleData?.competition_id ?? 0;

  const [singleData, setData] = useState<RuleModel>(_singleData as RuleModel);

  const { mutate, isLoading } = useMutation(({ values, id }: GlobalMutationProps<Partial<RuleFormCtx>>) => {
    return id ? API.updateOne(id, values) : API.createOne(values);
  });

  const formSubmitHandler = (formResetFn: () => void, formValues: RuleModel) => {
    const {
      achieveCareerStep,
      competitionRuleType,
      productVariations,
      translations,
      careerSteps,
      ...restValues
    } = formValues;

    const values: Partial<RuleFormCtx> = {
      ...restValues,
      competition_id: compId,
      achieve_career_step_id: achieveCareerStep?.id,
      competition_rule_type_id: competitionRuleType?.id,
      product_variation_ids: productVariations?.map((pv) => pv.id),
      career_step_ids: careerSteps ? careerSteps?.map((item) => item?.id) : null,
      translate: translations ? normalizeTranslate(translations) : undefined,
    };

    mutate(
      { id: singleData?.id ?? undefined, values },
      {
        onSuccess: (values: RuleModel) => {
          formResetFn();
          setData(values);
          onCallback?.(values);
        },
      },
    );
  };
  return <NewRulesForm isPending={isLoading} initialValues={_singleData} onSubmit={formSubmitHandler} />;
};

export default NewRulesUpsert;
