/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import TemplateForm from '../components/TemplateForm';
import { Template } from '../model/template.entity';
import TemplateModule from '../Template.Module';

const TemplateUpsert: React.FC<GlobalUpsertProps<Template>> = ({ onCallback, closeModal, singleData }) => {
  const module = new TemplateModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Template>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Template>) => {
    const values: Partial<Template> = { ...formValues, translate: normalizeTranslate(formValues.translate) };
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

  return <TemplateForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default TemplateUpsert;
