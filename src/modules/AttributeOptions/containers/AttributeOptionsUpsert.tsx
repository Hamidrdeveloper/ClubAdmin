
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
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import AttributeOptionsForm from '../components/AttributeTypeOptionsForm';
import { AT_Options } from '../model/attributeOptions.entity';

const AttributeOptionsUpsert: React.FC<GlobalUpsertProps<AT_Options>> = ({ onCallback, singleData }) => {
  const { t } = useTranslation();
  const apiService = new ApiBuilder(`attribute-type-options`, t('AttributeOptions.Title'));

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<AT_Options>) => {
    return id ? apiService.updateOne(id, values) : apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<AT_Options>) => {
    const { attributeType, translate, sort, file_id } = formValues;

    const values: Partial<AT_Options> = {
      sort: sort ?? undefined,
      file_id: file_id ?? undefined,
      attribute_type_id: attributeType?.id,
      translate: normalizeTranslate(translate),
    };

    mutate(
      { id: singleData ? singleData.id : undefined, values },
      {
        onSuccess: onCallback,
      },
    );
  };

  return (
    <AttributeOptionsForm
      // Need Attribute Type, when we call this form from modal there is no AttributeType Id to set options to it. therefore we have to use its select to choose that ID.
      needAT={true}
      initialValues={singleData}
      onSubmit={handleFormSubmit}
      isPending={isLoading}
    />
  );
};

export default AttributeOptionsUpsert;
