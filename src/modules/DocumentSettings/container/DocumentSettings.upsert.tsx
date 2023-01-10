/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC, ReactElement } from 'react';
import { useMutation } from 'react-query';

import DocumentSettingsForm from '../components/DocumentSettingsForm';
import DocumentSettingsModule from '../DocumentSettings.module';
import { DocumentSettingsFormCtx, DocumentSettingsModel } from '../model/DocumentSettings.entity';

const DocumentSettingsUpsert: FC<GlobalUpsertProps<DocumentSettingsModel>> = ({
  onCallback,
  singleData,
}: GlobalUpsertProps<DocumentSettingsModel>): ReactElement => {
  const module = new DocumentSettingsModule();

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<DocumentSettingsModel>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const submitHandler = (formValues: DocumentSettingsModel) => {
    const { documentType, mlm_elements, company, ...restValues } = formValues;

    const values: DocumentSettingsFormCtx = {
      company_id: company?.id,
      document_type_id: documentType?.id,
      mlm_elements: [{ ...mlm_elements[0], show_mlm: mlm_elements[0].show_mlm ?? false }],
      ...restValues,
    };

    console.log({ formValues, values });
    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <DocumentSettingsForm onSubmit={submitHandler} isPending={isLoading} initialValues={singleData} />;
};

export default DocumentSettingsUpsert;
