// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import VariationCategoryForm from '../components/VariationCategoryForm';
import { VariationCategoryFormContext } from '../model/variationCategory-args.entity';
import { VariationCategory } from '../model/variationCategory.entity';
import VariationCategoryModule from '../VariationCategory.module';

const VariationCategoryUpsert: FC<GlobalUpsertProps<VariationCategory>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const module = new VariationCategoryModule();

  const { mutate, isLoading } = useMutation(
    ({ id, values }: GlobalMutationProps<VariationCategoryFormContext>) => {
      return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
    },
  );

  const handleFormSubmit = (formValues: Partial<VariationCategory>) => {
    const { parent, translate, ...restValues } = formValues;

    const values: Partial<VariationCategoryFormContext> = {
      ...restValues,
      parent_id: parent ? parent.id : null,
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

  return (
    <VariationCategoryForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />
  );
};

export default VariationCategoryUpsert;
