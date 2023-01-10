/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import Fallback from '../components/Fallback';
import RulesForm from '../components/RulesForm';
import { RuleFormCtx, RuleModel } from '../model/Rule.entity';
import { competitionIdAtom } from '../service/competitionStore';
import { updateUserBlacklist } from '../service/UserBlacklist';

const API = new ApiBuilder<RuleModel>('competition-rules', i18n.t('Competition.Rule.Title'));

interface Props extends GlobalUpsertProps<RuleModel> {
  competitionId: number | undefined;
  onError: () => void;
  onSecondaryClick?: () => void;
}
const RulesUpsert = ({
  competitionId,
  onCallback,
  singleData,
  onError,
  onSecondaryClick,
}: Props): ReactElement => {
  // if we call upsert from rewards list (edit or create) compId will get value
  // if we call upsert from new competition steps we get competitionId through props
  const [compId] = useAtom(competitionIdAtom);
  // either of these should have a value, if it doesn't we will return a fallback
  if (!competitionId && !compId && !singleData?.competition_id) {
    return <Fallback title="Competition ID" />;
  }

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<RuleFormCtx>) => {
    return id ? API.updateOne(id, values) : API.createOne(values);
  });

  const { mutate: blockUsers, isLoading: blockUserLoading } = useMutation(updateUserBlacklist);

  const formSubmitHandler = (formValues: RuleModel) => {
    const competeId = competitionId ?? compId ?? singleData?.competition_id;

    const {
      achieveCareerStep,
      productVariations,
      competitionRuleType,
      blocked_users,
      careerSteps,
      ...restValues
    } = formValues;

    const values: RuleFormCtx = {
      ...restValues,
      competition_id: competeId ?? 0,
      achieve_career_step_id: achieveCareerStep?.id,
      competition_rule_type_id: competitionRuleType?.id,
      product_variation_ids: productVariations?.map((item) => item.id),
      career_step_ids: careerSteps ? careerSteps?.map((item) => item?.id) : null,
    };

    mutate({ id: singleData?.id ?? undefined, values }, { onSuccess: onCallback, onError: onError });

    if (competeId && blocked_users?.length > 0) {
      blockUsers({ id: competeId, userIds: blocked_users?.map((user) => user?.id) });
    }
  };
  return (
    <RulesForm
      onSecondaryClick={onSecondaryClick}
      isPending={isLoading && blockUserLoading}
      onSubmit={formSubmitHandler}
      initialValues={singleData}
    />
  );
};

export default RulesUpsert;
