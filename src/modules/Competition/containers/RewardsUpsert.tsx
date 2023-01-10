/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import Fallback from '../components/Fallback';
import RewardsForm from '../components/RewardsForm';
import { RewardFormCtx, RewardModel } from '../model/Reward.entity';
import { competitionIdAtom } from '../service/competitionStore';

const API = new ApiBuilder<RewardModel>('competition-rewards', i18n.t('Competition.Reward.Title'));

interface Props extends GlobalUpsertProps<RewardModel> {
  competitionId: number | undefined;
  onError?: () => void;
  onSecondaryClick?: () => void;
}
const RewardsUpsert = ({
  competitionId,
  singleData,
  onCallback,
  onError,
  onSecondaryClick,
}: Props): ReactElement => {
  // if we call upsert from rewards list (edit or create) compId will get value
  // if we call upsert from new competition steps we get competitionId through props
  const [compId] = useAtom(competitionIdAtom);
  // either of these should have a value, if it doesn't we will return a fallback
  if (!competitionId && !compId) {
    return <Fallback title="Competition ID" />;
  }

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<RewardFormCtx>) => {
    return id ? API.updateOne(id, values) : API.createOne(values);
  });

  const formSubmitHandler = (formResetFn: () => void, formValues: RewardModel) => {
    const { productVariations, translations, ...restValues } = formValues;

    const values: RewardFormCtx = {
      competition_id: competitionId ?? compId ?? 0,
      translate: Array.isArray(translations)
        ? normalizeTranslate(
            translations.map((trans) => {
              return { ...trans, locale: 'ln' };
            }),
          )
        : [],
      product_variation_ids: productVariations?.map((variation) => variation.id),
      ...restValues,
    };
    mutate(
      { id: singleData?.id ?? undefined, values },
      {
        onSuccess: (data: RewardModel) => {
          formResetFn();
          onCallback?.(data);
        },
        onError: onError,
      },
    );
  };

  return (
    <RewardsForm
      onSecondaryClick={onSecondaryClick}
      isPending={isLoading}
      onSubmit={formSubmitHandler}
      initialValues={singleData}
    />
  );
};

export default RewardsUpsert;
