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
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import AdditionalBonusModule from '../AdditionalBonus.module';
import AdditionalBonusForm from '../components/AdditionalBonusForm';
import { AdditionalBonusFormContext } from '../model';
import { AdditionalBonus } from '../model/additionalBonus.entity';

const AdditionalBonusUpsert: React.FC<GlobalUpsertProps<AdditionalBonus>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const module = new AdditionalBonusModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<AdditionalBonus>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<AdditionalBonus>) => {
    const { userType, translate, ...restValues } = formValues;

    const values: Partial<AdditionalBonusFormContext> = {
      ...restValues,
      user_type_id: userType?.id,
      translate: normalizeTranslate(translate),
    };

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

  return <AdditionalBonusForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default AdditionalBonusUpsert;
